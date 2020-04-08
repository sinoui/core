import TopAppBarFoundation from './TopAppBarFoundation';

/**
 * 可收缩状态顶部应用栏 - 内容有滚动时滚动时，变成收缩状态；内容滚动到顶部时，变成标准应用栏。
 */
export default class ShortFoundation extends TopAppBarFoundation {
  public handleScroll() {
    if (this.adapter.getScrollTop() > 0 && !this.scrolled) {
      this.scrolled = true;
      this.adapter.addClass('sinoui-top-app-bar--short-scrolled');
    }
    if (this.adapter.getScrollTop() === 0 && this.scrolled) {
      this.scrolled = false;
      this.adapter.removeClass('sinoui-top-app-bar--short-scrolled');
    }
  }
}
