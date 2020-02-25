/**
 * 删除对象中所有未定义值的属性。
 *
 * @param {object} obj
 */
export function removeUndefinedProperties<T extends {}>(obj: T): T {
  const newObj = {} as T;
  Object.keys(obj)
    .filter((key) => typeof obj[key] !== 'undefined')
    .forEach((key) => {
      newObj[key] = obj[key];
    });
  return newObj;
}
