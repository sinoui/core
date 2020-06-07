/**
 * 缓存指定函数的执行结果
 *
 * 注意：此方法只会取函数的第一个参数作为缓存键。
 *
 * @param fn 需要缓存的函数
 */
export default function mem<
  ArgumentsType extends unknown[],
  ReturnType,
  FunctionToMemoize = (...args: ArgumentsType) => ReturnType
>(
  fn: (...args: ArgumentsType) => ReturnType,
): FunctionToMemoize & { clear(): void } {
  const cache = new Map<any, { data: ReturnType }>();

  const memoized = (...args: ArgumentsType) => {
    const key = args[0];

    const cacheItem = cache.get(key);
    if (cacheItem) {
      return cacheItem.data;
    }

    const result = fn(...args);

    cache.set(key, { data: result });

    return result;
  };

  memoized.clear = () => {
    cache.clear();
  };

  return memoized as any;
}
