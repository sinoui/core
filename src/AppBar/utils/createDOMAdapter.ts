export interface TopAppBarAdapter {
  setStyle(styleName: string, value: any): void;
  addClass(className: string): void;
  removeClass(className: string): void;
  getTopAppBarHeight?: () => number;
  getViewportScrollY?: () => number;
  getScrollTop(): number;
}

/**
 * 包装器 与dom元素交互
 * @param scrollTarget
 * @param appBar
 */
export default function createDOMAdapter(
  scrollTarget: HTMLElement | Window,
  appBar: HTMLElement,
) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setStyle(styleName: any, value?: any) {
      // eslint-disable-next-line no-param-reassign
      appBar.style[styleName] = value;
    },
    addClass(className: string) {
      appBar.classList.add(className);
    },
    removeClass(className: string) {
      appBar.classList.remove(className);
    },
    getTopAppBarHeight() {
      return appBar.clientHeight;
    },
    getScrollTop() {
      return scrollTarget === window
        ? window.pageYOffset
        : (scrollTarget as HTMLElement).scrollTop;
    },
  };
}
