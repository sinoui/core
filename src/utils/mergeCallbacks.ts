/* eslint-disable func-names */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
/**
 * 合并一组回调函数
 *
 * @param callbacks 一组回调函数
 */
export default function mergeCallbacks<T extends Function>(
  ...callbacks: Array<Function | null | undefined>
): T {
  const fns = callbacks.filter(Boolean) as Function[];
  return function () {
    const args = arguments;
    fns.forEach((fn) => fn.apply(null, args));
  } as any;
}
