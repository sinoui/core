export default interface FormControlProps
  extends React.ComponentPropsWithRef<'div'> {
  /**
   * 设置标签。
   */
  label?: React.ReactNode;
  /**
   * 设置表单控件帮助性文本。
   */
  helperText?: React.ReactNode;
  /**
   * 表单控件校验错误信息。
   */
  error?: React.ReactNode;
  /**
   * 指定标签与表单控件之间的布局模式。默认为垂直布局（`vertical`）。`horizontal`表示水平布局。
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 指定表单控件的id
   */
  id?: string;
  /**
   * 输入框形态
   */
  variant?: 'standard' | 'filled' | 'outlined';
  /**
   * 指定标签的布局方式
   */
  labelLayout?: 'floating' | 'shrink' | 'standard';
  /**
   * 表单控件是否已填充值
   */
  filled?: boolean;
  /**
   * 如果设置为`true`，则表示此表单控件必填。
   */
  required?: boolean;
  /**
   * 设置为`true`，表示不可用。
   */
  disabled?: boolean;
  /**
   * 设置为`true`，表示表单控件处于聚焦状态。
   */
  focused?: boolean;
  /**
   * 标签是否显示冒号
   */
  colon?: boolean;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 标签宽度 只有水平布局支持此属性
   */
  labelWidth?: number;
}
