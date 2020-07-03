import { useEffect } from 'react';
import useEventCallback from '../utils/useEventCallback';
import isRefObject from '../utils/isRefObject';

/**
 * 执行点击指定一个或者一组元素之外区域的回调函数
 *
 * @param elements 允许点击的元素
 * @param callback 点击元素之外的区域时的回调函数
 */
export default function useClickAwayListener(
  elements: Array<HTMLElement | React.RefObject<HTMLElement>>,
  callback: (event: MouseEvent) => void,
) {
  const handleClick = useEventCallback((event: MouseEvent) => {
    const filteredElements = elements
      .map((element) => (isRefObject(element) ? element.current : element))
      .filter(Boolean);

    if (filteredElements.length === 0) {
      return;
    }

    const isInnerClick = filteredElements.some(
      (element) => element && element.contains(event.target as Node),
    );
    if (!isInnerClick) {
      callback(event);
    }
  });

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.addEventListener('click', handleClick, true);
  }, [handleClick]);
}
