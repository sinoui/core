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
}
