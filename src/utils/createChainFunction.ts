/**
 * 创建链式调用的函数
 */
export type FunctionType = (...args: any[]) => any;

export function createChainFunction(...funs: FunctionType[]) {
  const filteredFuns = funs.filter((fun) => typeof fun === 'function');
  return (...args: any[]) => filteredFuns.forEach((fun) => fun(...args));
}
