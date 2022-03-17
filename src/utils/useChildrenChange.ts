import { debounce } from '@sinoui/utils';
import { useRef } from 'react';
import useRefInEffect from './useRefInEffect';

/**
 * 监听子孙元素变更
 *
 * > 注意：回调函数已经做了 debounce 的处理
 *
 * @param elementRef 需要监听子元素发生变更的元素引用
 * @param listen 子元素发生变更时调用的回调函数
 */
export default function useChildrenChange(
  elementRef: React.RefObject<HTMLElement>,
  listen: () => void,
) {
  const listenRef = useRef(listen);
  listenRef.current = listen;

  useRefInEffect(elementRef, (element) => {
    const callback = debounce(() => listenRef.current(), 64);
    const mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
    });
    return () => {
      mutationObserver.disconnect();
      callback.cancel();
    };
  });
}
