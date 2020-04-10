import TopAppBarFoundation from './TopAppBarFoundation';

/**
 * 固定突出顶部应用栏 - 内容有滚动时，变成标准应用栏；内容滚动到顶部时，变成突出应用栏
 */
export default class FixedProminentFoundation extends TopAppBarFoundation {
  public handleScroll() {
    if (this.adapter.getScrollTop() === 0 && this.isScrolled) {
      this.isScrolled = false;
      this.adapter.removeClass('sinoui-top-app-bar--prominent-scrolled');
    } else if (this.adapter.getScrollTop() > 0 && !this.isScrolled) {
      this.isScrolled = true;
      this.adapter.addClass('sinoui-top-app-bar--prominent-scrolled');
    }
  }
}
