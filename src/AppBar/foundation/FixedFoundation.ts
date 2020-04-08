import TopAppBarFoundation from './TopAppBarFoundation';

/**
 * 固定顶部应用栏 - 内容有滚动时，应用栏阴影海拔为8；内容滚动到顶部时，恢复正常阴影
 */
export default class FixedFoundation extends TopAppBarFoundation {
  public handleScroll() {
    if (this.adapter.getScrollTop() > 0 && !this.scrolled) {
      this.scrolled = true;
      this.adapter.addClass('sinoui-top-app-bar--fixed-scrolled');
    }
    if (this.adapter.getScrollTop() === 0 && this.scrolled) {
      this.scrolled = false;
      this.adapter.removeClass('sinoui-top-app-bar--fixed-scrolled');
    }
  }
}
