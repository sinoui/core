/**
 * 获取元素内容区域的高度
 * @param node 元素
 * @returns 返回元素内容区域的高度
 */
export default function getInnerHeight(node: HTMLElement) {
  const { clientHeight } = node;
  const { paddingTop, paddingBottom } = getComputedStyle(node);
  return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}
