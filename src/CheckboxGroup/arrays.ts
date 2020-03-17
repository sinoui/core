/**
 * 删除数组中指定元素
 *
 * @export
 * @param {object[]} items
 * @param {object} item
 * @returns  返回删除元素后生成的新数组
 */
export function removeItem<T>(items: T[], item: T): T[] {
  const idx = items.indexOf(item);
  if (idx !== -1) {
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
  }
  return items;
}

/**
 * 向数组items的结尾添加新项目item
 *
 * @export
 * @param {object[]} items 数组
 * @param {object} item  待添加的项目
 * @returns 返回已经添加项目item的新数组
 */
export function pushItem<T>(items: T[], item: T): T[] {
  return [...items, item];
}

/**
 * 向数组items中添加或者从数组中删除项目item。
 *
 * 如果数组items中已经存在项目item，则返回删除项目item后的新数组；否则返回已添加项目item的新数组。
 *
 * @param {any[]} items 数组
 * @param {any} item  项目
 * @returns {[]} 返回已经删除或者添加项目item的新数组
 */
export function toggleItem<T>(items: T[], item: T): T[] {
  const idx = items.indexOf(item);
  if (idx === -1) {
    return pushItem(items, item);
  }
  return removeItem(items, item);
}
