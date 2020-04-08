import TopAppBarFoundation from './TopAppBarFoundation';

/**
 * 固定顶部应用栏 - 内容有滚动时，应用栏阴影海拔为8；内容滚动到顶部时，恢复正常阴影
 */
export default class FixedFoundation extends TopAppBarFoundation {
  private lastScrollTop = 0;

  private scrolllTop = 0;

  public handleScroll() {
    this.scrolllTop = this.adapter.getScrollTop();

    if (this.scrolllTop > this.lastScrollTop) {
      this.adapter.addClass('sinoui-top-app-bar--fixed-scrolled');
    } else if (this.scrolllTop < this.lastScrollTop) {
      this.adapter.removeClass('sinoui-top-app-bar--fixed-scrolled');
    }

    this.lastScrollTop = this.scrolllTop <= 0 ? 0 : this.scrolllTop;
  }
}
