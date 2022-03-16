import { debounce } from '@sinoui/utils';
import { useEffect, useRef } from 'react';

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
  const element = elementRef.current;

  useEffect(() => {
    if (!element) {
      return undefined;
    }
    const callback = debounce(() => listenRef.current(), 64);
    const mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [element]);
}
