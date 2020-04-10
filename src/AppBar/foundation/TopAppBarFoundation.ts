import { TopAppBarAdapter } from '../utils/createDOMAdapter';

export default class TopAppBarFoundation {
  /**
   * 顶部应用栏dom交互包装器
   */
  public adapter: TopAppBarAdapter;

  /**
   * 滚动目标元素
   */
  public scrollTarget: HTMLElement | Window;

  /**
   * 上一次滚动条距页面顶端的距离
   *
   */
  public lastScrollTop = 0;

  /**
   * 当前滚动条距页面顶端的距离
   *
   */
  public scrolllTop = 0;

  constructor(adapter: TopAppBarAdapter, scrollTarget: HTMLElement | Window) {
    this.adapter = adapter;
    this.scrollTarget = scrollTarget;

    // 注册事件
    this.scrollTarget.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * 处理滚动事件
   */
  public handleScroll() {
    this.scrolllTop = this.adapter.getScrollTop();

    if (this.scrolllTop > this.lastScrollTop) {
      const top = this.adapter.getTopAppBarTopOffset();
      this.adapter.setStyle('top', `-${top}px`);
    } else if (this.scrolllTop < this.lastScrollTop) {
      // 向上滚动
      this.adapter.setStyle('top', `0px`);
    }

    this.lastScrollTop = this.scrolllTop <= 0 ? 0 : this.scrolllTop;
  }

  /**
   * 处理浏览器窗口大小改变事件
   */
  public handleResize() {
    this.handleScroll();
  }

  /**
   * 销毁
   */
  public destory() {
    this.scrollTarget.removeEventListener('scroll', this.handleScroll);
  }
}
