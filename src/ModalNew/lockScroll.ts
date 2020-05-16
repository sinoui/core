/* eslint-disable no-param-reassign */
import getScrollbarSize from 'dom-helpers/scrollbarSize';

/**
 * 判断指定容器元素是否溢出
 *
 * @param container 容器
 */
function isOverflowing(container: HTMLElement) {
  if (container === document.body) {
    return window.innerWidth > document.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}

/**
 * 获取指定元素的padding-right
 *
 * @param node 元素
 */
const getPaddingRight = (node: HTMLElement) =>
  parseInt(window.getComputedStyle(node).paddingRight, 10) || 0;

/**
 * 锁定固定元素
 */
const scrollFixedNodes = () => {
  const fixedNodes = document.body.querySelectorAll('.sinoui-fixed');
  const resets = [].map.call(fixedNodes, (node: HTMLElement) => {
    const { paddingRight } = node.style;
    node.style.paddingRight = `${getScrollbarSize() + getPaddingRight(node)}px`;
    return () => {
      node.style.paddingRight = paddingRight;
    };
  }) as Function[];
  return () => resets.forEach((fn) => fn());
};

/**
 * 锁定指定容器的滚动
 *
 * @param container 容器
 */
export default function lockScroll(container: HTMLElement) {
  if (isOverflowing(container)) {
    const { overflow, paddingRight } = container.style;
    container.style.overflow = 'hidden';
    container.style.paddingRight = `${
      getScrollbarSize() + getPaddingRight(container)
    }px`;
    const reset = scrollFixedNodes();
    const unlock = () => {
      reset();
      container.style.overflow = overflow;
      container.style.paddingRight = paddingRight;
    };

    return unlock;
  }

  return undefined;
}
