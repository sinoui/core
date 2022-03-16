import { useEffect, useRef } from 'react';

/**
 * 监听子孙元素变更
 *
 * @param elementRef 需要监听子元素发生变更的元素引用
 * @param listen 子元素发生变更时调用的回调函数
 */
export default function useChildrenChange(
  elementRef: React.RefObject<HTMLElement>,
  listen: () => void,
) {
  const listenRef = useRef(listen);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return undefined;
    }

    const mutationObserver = new MutationObserver(() => listenRef.current());
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [elementRef]);
}
