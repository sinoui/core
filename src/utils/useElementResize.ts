import { debounce } from '@sinoui/utils';
import type React from 'react';
import { useRef, useState } from 'react';

import NODE_ENV from './env';
import useRefInEffect from './useRefInEffect';

/**
 * 创建采用 raf 延迟执行回调函数的新函数
 *
 * @param callback 回调函数
 * @returns 返回 raf 延迟执行回调函数的新函数
 */
function createRafCallback<T extends () => void>(
  callback: T,
): T & {
  /**
   * 取消函数
   */
  cancel: () => void;
} {
  let raf = -1;
  const rafCallback = (...args: any) => {
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(() => (callback as any)(...args));
  };
  rafCallback.cancel = () => window.cancelAnimationFrame(raf);
  return rafCallback as any;
}

/**
 * 监听元素的尺寸变化
 *
 * > 注意：回调函数 listen 已经做了 debounce 处理
 *
 * 在 IE 11 中使用时，需要添加 ResizeObserver polyfill：https://www.npmjs.com/package/resize-observer-polyfill
 *
 * @param elementRef 需要监听尺寸变化的元素引用
 * @param listen 事件回调函数，尺寸发生变化时调用
 * @param useRaf 是否采用 raf 延迟执行回调函数。默认采用的是 debounce 延迟执行回调函数
 */
export default function useElementResize(
  elementRef: React.RefObject<HTMLElement | null> | undefined,
  listen: () => void,
  useRaf = false,
) {
  const listenRef = useRef(listen);
  listenRef.current = listen;
  const [callback] = useState(() =>
    useRaf
      ? createRafCallback(() => listenRef.current())
      : debounce(() => listenRef.current(), 64),
  );

  useRefInEffect(elementRef, (element) => {
    window.addEventListener('resize', callback, false);
    const isTest = NODE_ENV === 'test';
    if (isTest) {
      return undefined;
    }

    let observer: ResizeObserver | undefined;
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(callback);
      observer.observe(element);
    }

    return () => {
      callback.cancel();
      observer?.disconnect();
      window.removeEventListener('resize', callback, false);
    };
  });
}
