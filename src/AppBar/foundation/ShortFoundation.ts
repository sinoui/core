import TopAppBarFoundation from './TopAppBarFoundation';

/**
 * 可收缩状态顶部应用栏 - 内容有滚动时滚动时，变成收缩状态；内容滚动到顶部时，变成标准应用栏。
 */
export default class ShortFoundation extends TopAppBarFoundation {
  private lastScrollTop = 0;

  private scrolllTop = 0;

  public handleScroll() {
    this.scrolllTop = this.adapter.getScrollTop();

    if (this.scrolllTop > this.lastScrollTop) {
      this.adapter.addClass('sinoui-top-app-bar--short-scrolled');
    } else if (this.scrolllTop < this.lastScrollTop) {
      this.adapter.removeClass('sinoui-top-app-bar--short-scrolled');
    }

    this.lastScrollTop = this.scrolllTop <= 0 ? 0 : this.scrolllTop;
  }
}
