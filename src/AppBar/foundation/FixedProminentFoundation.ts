import TopAppBarFoundation from './TopAppBarFoundation';

/**
 * 固定突出顶部应用栏 - 内容有滚动时，变成标准应用栏；内容滚动到顶部时，变成突出应用栏
 */
export default class FixedProminentFoundation extends TopAppBarFoundation {
  public handleScroll() {
    this.scrolllTop = this.adapter.getScrollTop();

    if (this.scrolllTop > this.lastScrollTop) {
      this.adapter.addClass('sinoui-top-app-bar--prominent-scrolled');
    } else if (this.scrolllTop < this.lastScrollTop) {
      this.adapter.removeClass('sinoui-top-app-bar--prominent-scrolled');
    }

    this.lastScrollTop = this.scrolllTop <= 0 ? 0 : this.scrolllTop;
  }
}
