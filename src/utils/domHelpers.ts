/**
 * 获取子元素相对于父元素的滚动高度
 *
 * @param {HTMLElement} parent 父元素
 * @param {HTMLElement} child 子元素
 */
export function getScrollTop(parent: HTMLElement, child: HTMLElement): number {
  let element: HTMLElement | null = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentElement;
    scrollTop += (element as any).scrollTop;
  }
  return scrollTop;
}

/**
 * 获取子元素相对于父元素的水平滚动位置
 *
 * @param {HTMLElement} parent 父元素
 * @param {HTMLElement} child 子元素
 */
export function getScrollLeft(parent: HTMLElement, child: HTMLElement): number {
  let element: any = child;
  let scrollLeft = 0;

  while (element && element !== parent) {
    element = element.parentElement;
    scrollLeft += element.scrollLeft;
  }
  return scrollLeft;
}
