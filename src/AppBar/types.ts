export interface AppBarStatusTypes {
  /**
   * 突出模式
   */
  prominent?: boolean;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 固定模式
   */
  fixed?: boolean;
  /**
   * 可收缩
   */
  short?: boolean;
  /**
   * 一直处于收缩的状态的应用栏
   */
  shortCollapsed?: boolean;
}

export interface AppBarProps extends AppBarStatusTypes {
  /**
   * 应用栏左侧图标
   */
  navigationIcon?: React.ReactNode;
  /**
   * 应用栏标题
   */
  title?: React.ReactNode;
  /**
   * 应用栏可操作元素
   */
  actionItems?: React.ReactNode;
  /**
   * 滚动目标元素
   */
  targetScroll?: HTMLElement | Window | React.RefObject<HTMLElement>;
  /**
   * 给根元素指定自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 给根元素指定自定义类名
   */
  className?: string;
}
