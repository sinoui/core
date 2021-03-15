/**
 * 渲染模态框遮罩层的属性
 */
export default interface RenderModalBackdropProps {
  /**
   * 设置为`true`，则打开遮罩层
   */
  open: boolean;
  /**
   * 遮罩层的z-index
   */
  zIndex?: number;
  /**
   * 遮罩层的点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 设置遮罩层的透明度。
   */
  opacity?: number;
  [x: string]: any;
}
