import React from 'react';
import RadioButton from './RadioButton';
import withLabel, { FormControlWithLabelProps } from '../Checkbox/withLabel';

export interface RadioProps
  extends FormControlWithLabelProps<string, HTMLInputElement> {
  /**
   * 单选框的值
   */
  value?: string;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 是否不可用
   */
  disabled?: boolean;
  /**
   * 是否紧缩型
   */
  dense?: boolean;
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

/**
 * 带文字的Radio组件
 */
const Radio = withLabel<string, HTMLInputElement, RadioProps>('Radio')(
  RadioButton,
);

Radio.displayName = 'Radio';

export default Radio;
