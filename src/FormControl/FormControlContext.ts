import React from 'react';

export interface FormControlContextData {
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
   * 表单控件处于校验错误状态。
   */
  error?: boolean;
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
   * 输入框聚焦回调函数
   */
  onFocus(): void;
  /**
   * 输入框失去焦点时的回调函数
   */
  onBlur(): void;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 标签元素引用
   */
  labelRef?: React.RefObject<HTMLLabelElement>;
  /**
   * 表单控件的布局模式
   */
  layout?: 'horizontal' | 'vertical';
}

const FormControlContext = React.createContext<FormControlContextData | null>(
  null,
);

export default FormControlContext;
