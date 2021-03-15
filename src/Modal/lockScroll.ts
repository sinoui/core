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
 *
 * @param container 容器元素
 * @param overflowing 容器是否溢出
 */
const scrollFixedNodes = (_: HTMLElement, overflowing: boolean) => {
  if (!overflowing) {
    return undefined;
  }
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
 * 设置指定元素为溢出隐藏
 *
 * @param container 容器元素
 * @param overflowing 容器是否溢出
 */
const setContainerOverflowHidden = (
  container: HTMLElement,
  overflowing: boolean,
) => {
  const parent = container.parentElement;
  const isHtmlScroll =
    parent?.tagName === 'HTML' &&
    getComputedStyle(parent).overflow === 'scroll';

  if (!isHtmlScroll && !overflowing) {
    return undefined;
  }

  const containerElement = isHtmlScroll && parent ? parent : container;
  const { overflow } = containerElement.style;
  containerElement.style.overflow = 'hidden';

  return () => {
    containerElement.style.overflow = overflow;
  };
};

/**
 * 设置容器的右边距
 *
 * @param container 容器元素
 * @param overflowing 容器是否溢出
 */
const setContainerPaddingRight = (
  container: HTMLElement,
  overflowing: boolean,
) => {
  if (overflowing) {
    const { paddingRight } = container.style;
    container.style.paddingRight = `${
      getScrollbarSize() + getPaddingRight(container)
    }px`;
    return () => {
      container.style.paddingRight = paddingRight;
    };
  }
  return undefined;
};

/**
 * 锁定指定容器的滚动
 *
 * @param container 容器
 */
export default function lockScroll(container: HTMLElement) {
  const overflowing = isOverflowing(container);
  const resets = [
    setContainerOverflowHidden,
    setContainerPaddingRight,
    scrollFixedNodes,
  ]
    .map((fn) => fn(container, overflowing))
    .filter(Boolean) as Function[];
  return () => resets.forEach((fn) => fn());
}
