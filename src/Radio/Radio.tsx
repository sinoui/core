import React from 'react';
import { withLabel, FormControlWithLabelProps } from '@sinoui/core/Checkbox';
import RadioButton from './RadioButton';

export type RadioProps<T> = FormControlWithLabelProps<T, HTMLInputElement> &
  RadioExtendProps;

export interface RadioExtendProps {
  /**
   * 添加自定义类名
   */
  className?: string;

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
 * 带文字的单选按组件。
 */
const Radio = withLabel<any, HTMLInputElement, RadioProps<any>>('Radio')(
  RadioButton,
);

Radio.displayName = 'Radio';

export default Radio;
