import React, { useEffect, useRef } from 'react';
import elementResizeDetectorMaker from 'element-resize-detector';
import NODE_ENV from './env';

let erd: elementResizeDetectorMaker.Erd | undefined;

function getErd() {
  if (!erd) {
    erd = elementResizeDetectorMaker({
      strategy: 'scroll',
    });
  }

  return erd;
}

/**
 * 监听元素的尺寸变化
 *
 * 在 IE 11 中使用时，需要添加 ResizeObserver polyfill：https://www.npmjs.com/package/resize-observer-polyfill
 *
 * @param elementRef 需要监听尺寸变化的元素引用
 * @param listen 事件回调函数，尺寸发生变化时调用
 */
export default function useElementResize(
  elementRef: React.RefObject<HTMLElement | null>,
  listen: () => void,
) {
  const listenRef = useRef(listen);

  useEffect(() => {
    const element = elementRef.current;
    const isTest = NODE_ENV === 'test';
    const callback = () => listenRef.current();
    if (!element || isTest) {
      return undefined;
    }

    getErd().listenTo(element, callback);

    return () => {
      getErd().removeListener(element, callback);
    };
  }, [elementRef]);
}
