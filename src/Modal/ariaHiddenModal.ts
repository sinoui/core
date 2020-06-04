const blacklistTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE'];

const isHTMLElement = (node: ChildNode): node is HTMLElement =>
  node && node.nodeType === 1;

/**
 * 将指定模态框之外的容器内可见元素的`aria-hidden`设置为`false`。
 *
 * @param modalNode 模态框节点
 * @param container 容器
 */
export default function ariaHiddenModal(
  modalNode: HTMLElement,
  container: HTMLElement,
) {
  const visibleElements: HTMLElement[] = [].filter.call(
    container.childNodes,
    (node: ChildNode) =>
      isHTMLElement(node) &&
      blacklistTagNames.indexOf(node.tagName) === -1 &&
      modalNode !== node &&
      node.getAttribute('aria-hidden') !== 'true',
  );

  visibleElements.forEach((element) =>
    element.setAttribute('aria-hidden', 'true'),
  );

  return () =>
    visibleElements.forEach((element) =>
      element.removeAttribute('aria-hidden'),
    );
}
