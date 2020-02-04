import { useCallback, useState } from 'react';

/**
 * 同时使用多个ref
 *
 * @param refs 多个引用
 */
export default function useMultiRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): (value: T) => void {
  const [memoizedRefs] = useState(refs);
  return useCallback(
    (value: T) => {
      memoizedRefs.filter(Boolean).forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value);
        } else {
          (ref as React.MutableRefObject<T>).current = value;
        }
      });
    },
    [memoizedRefs],
  );
}
