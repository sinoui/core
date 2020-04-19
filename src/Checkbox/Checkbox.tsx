import React from 'react';
import CheckboxButton from './BaseCheckboxButton';
import withLabel, { FormControlWithLabelProps } from './withLabel';

export type CheckboxProps<T> = FormControlWithLabelProps<T, HTMLInputElement> &
  CheckboxExtendProps;

export interface CheckboxExtendProps {
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 是否是部分选中状态
   */
  indeterminate?: boolean;
  /**
   * 点击时的回调函数
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 错误状态
   */
  error?: any;
  /**
   * 设置为`true`，表示密集模式。
   */
  dense?: boolean;
}

/**
 * 带文字的复选框组件。
 */
const Checkbox = withLabel<any, HTMLInputElement, CheckboxProps<any>>(
  'Checkbox',
)(CheckboxButton);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
