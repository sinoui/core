import { useEffect, useRef } from 'react';

/**
 * 在 effect 中使用 ref 中的有效值的 hook
 *
 * @param ref 值引用
 * @param callback 回调函数
 */
export default function useRefInEffect<T>(
  ref: React.RefObject<T | null> | undefined,
  callback: (obj: T) => void | (() => void),
) {
  const obj = ref?.current;
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const current = ref?.current;
    if (!current) {
      return undefined;
    }
    return callbackRef.current(current);
  }, [obj, ref]);
}
