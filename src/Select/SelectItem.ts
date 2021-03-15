/**
 * 选择框项
 */
export default interface SelectItem<T = string> {
  /**
   * 键
   */
  id: string;
  /**
   * 项目值
   */
  value: T;
  /**
   * 项目呈现的内容
   */
  children?: React.ReactNode;
  /**
   * 标签名称
   */
  title?: string;
}
