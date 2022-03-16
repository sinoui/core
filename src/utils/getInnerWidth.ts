/**
 * 获取指定元素内容区域的宽度
 *
 * @param node 元素
 *
 * @returns 返回指定元素内容区域的宽度
 */
export default function getInnerWidth(node: HTMLElement) {
  const { clientWidth } = node;
  const { paddingLeft, paddingRight } = getComputedStyle(node);

  return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}
