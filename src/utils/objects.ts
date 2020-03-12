/**
 * 删除对象中所有未定义值的属性。
 *
 * @param {object} obj
 */
export function removeUndefinedProperties<T extends { [name: string]: any }>(
  obj: T,
): T {
  const newObj: any = {};
  Object.keys(obj)
    .filter((key) => typeof obj[key] !== 'undefined')
    .forEach((key) => {
      newObj[key] = obj[key];
    });
  return newObj;
}
