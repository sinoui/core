import TopAppBarFoundation from './TopAppBarFoundation';

/**
 * 一直处于收缩状态顶部应用栏 - 固定显示在左上角。
 */
export default class ShortCollapsedFoundation extends TopAppBarFoundation {
  public handleScroll() {
    if (this.adapter.getStyleValue('top') !== 0) {
      this.adapter.setStyle('top', '0px');
    }
  }
}
