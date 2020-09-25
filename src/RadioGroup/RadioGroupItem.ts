/**
 * 单选按钮组选项
 */
export default interface RadioGroupItem<T> {
  /**
   * 选项id，不指定时等于value。
   */
  id?: string;
  /**
   * 选项值
   */
  value: T;
  /**
   * 选项标签
   */
  label: React.ReactNode;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * label位置
   */
  labelPosition?: 'left' | 'right';
  /**
   * 只读
   */
  readOnly?: boolean;
  /**
   * 紧凑模式
   */
  dense?: boolean;
  /**
   * 设置颜色
   */
  color?: any;
}
