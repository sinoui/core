import React from 'react';
import { withLabel, FormControlWithLabelProps } from '@sinoui/core/Checkbox';
import RadioButton from './RadioButton';

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
}

/**
 * 带文字的Radio组件
 */
const Radio = withLabel<string, HTMLInputElement, RadioProps>('Radio')(
  RadioButton,
);

Radio.displayName = 'Radio';

export default Radio;
