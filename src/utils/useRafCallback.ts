import { useEffect, useRef, useState } from 'react';

/**
 * 将回调函数做 raf 保护
 *
 * @param callback 回调函数
 */
export default function useRafCallback<T extends Function>(callback: T): T {
  const callbackRef = useRef(callback);
  const rafRef = useRef(-1);

  const [rafCallback] = useState(() => (...args: any) => {
    window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(() => {
      callbackRef.current(...args);
    });
  });

  useEffect(() => () => window.cancelAnimationFrame(rafRef.current), []);

  return rafCallback as any;
}
