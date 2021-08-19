/**
 * 标签组件属性
 *
 * @export
 * @interface FormLabelProps
 */
export default interface FormLabelProps {
  /**
   * 必填项
   */
  required?: boolean;
  /**
   * 错误状态
   */
  error?: boolean;
  /**
   * 焦点状态
   */
  focused?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 输入框是否有值
   */
  filled?: boolean;
  /**
   * 标签处于聚焦状态时的颜色
   */
  color?: string;
  /**
   * 标签布局模式
   */
  layout?: 'floating' | 'shrink' | 'standard';
  /**
   * 表单控件的布局模式
   */
  variant?: 'standard' | 'filled' | 'outlined';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * 密集模式
   */
  dense?: boolean;
}
