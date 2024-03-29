import isRefObject from './isRefObject';

export type ContainerElement<T = HTMLElement> =
  | React.RefObject<T>
  | T
  | (() => React.RefObject<T> | T | undefined | null)
  | undefined
  | null;

const isWindow = typeof window !== 'undefined';

/**
 * 获取容器元素
 *
 * @param container 容器
 * @param defaultElement 默认的容器元素
 */
export default function getContainerElement<T = HTMLElement>(
  container: ContainerElement<T>,
  defaultElement = (isWindow ? document.body : undefined) as any,
): T {
  if (!isWindow) {
    return defaultElement;
  }
  if (isRefObject(container)) {
    return container.current ?? defaultElement;
  }
  if (typeof container === 'function') {
    return getContainerElement((container as any)());
  }
  return container ?? defaultElement;
}
