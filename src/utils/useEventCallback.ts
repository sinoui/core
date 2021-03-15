import * as React from 'react';
import useEnhancedEffect from './useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */
export default function useEventCallback(fn: Function) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return React.useCallback((...args) => (0, ref.current)(...args), []);
}
