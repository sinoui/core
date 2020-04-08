import { TopAppBarAdapter } from '../utils/createDOMAdapter';

export default class TopAppBarFoundation {
  /**
   * 页面是否处于滚动
   */
  public scrolled = false;

  /**
   * 顶部应用栏dom交互包装器
   */
  public adapter: TopAppBarAdapter;

  /**
   * 滚动目标元素
   */
  public scrollTarget: HTMLElement | Window;

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public handleScroll() {}

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
