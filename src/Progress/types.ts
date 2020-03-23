export interface ProgressPropsType {
  /**
   * 设置为true 表示是线性进度指示器
   */
  linear?: boolean;
  /**
   * 设置为true 表示是定量进度指示器
   */
  determinate?: boolean;
  /**
   * 缓冲进度条
   */
  buffer?: boolean;

  /**
   * 指定定量进度指示器的进度
   */
  value?: number;
  /**
   * 指定缓存进度指示器的缓冲进度
   */
  bufferValue?: number;
  /**
   * 进度条指示器的颜色
   */
  color?: string;
  /**
   * 进度条的厚度，默认为4px
   */
  thickness?: number;
  /**
   * 圆形进度条指示器的尺寸，默认为40px
   */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}
