export interface TopAppBarAdapter {
  /**
   * 设置样式值
   *
   * @param {string} styleName 样式名称
   * @param {*} value 样式值
   */
  setStyle(styleName: string, value: any): void;
  /**
   * 获取样式值
   *
   * @param {string} styleName 样式名称
   */
  getStyleValue(styleName: string): number | string;
  /**
   *添加className
   *
   * @param {string} className
   */
  addClass(className: string): void;
  /**
   *获取className
   *
   * @param {string} className
   */
  removeClass(className: string): void;
  /**
   *获取应用栏高度
   */
  getTopAppBarHeight(): number;
  /**
   * 获取应用栏top值 = 应用栏 高度 + 阴影大小
   */
  getTopAppBarTopOffset(): number;
  /**
   * 获取滚动元素的滚动条据页面顶端的距离
   *
   */
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
    getStyleValue(styleName: any) {
      return appBar.style[styleName];
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
    getTopAppBarTopOffset() {
      // appbar的阴影的垂直高度为4px
      const boxShadow = 4;
      // 为了让应用栏不显示 需要将值设置为默认阴影的2倍。
      return this.getTopAppBarHeight() + boxShadow * 2;
    },
    getScrollTop() {
      return scrollTarget === window
        ? window.pageYOffset
        : (scrollTarget as HTMLElement).scrollTop;
    },
  };
}
