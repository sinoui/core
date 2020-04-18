import React from 'react';
import { useFormControlContext } from '@sinoui/core/FormControl';
import FormControlLabelContainer from './FormControlLabelContainer';

export interface FormControlLabelProps {
  /**
   * 标签位置
   */
  labelPosition?: 'left' | 'right';
  /**
   * 标签
   *
   * @type {React.ReactNode}
   * @memberof FormControlLabelProps
   */
  label: React.ReactNode;
  /**
   * 表单控件
   */
  control: React.ReactElement;
  /**
   * 不可用
   */
  disabled?: boolean;
  /**
   * 只读
   */
  readOnly?: boolean;
}

/**
 * 用于给Radio、Checkbox、Switch等组件添加上文本的组件。
 */
export default function FormControlLabel({
  label,
  control,
  labelPosition = 'right',
}: FormControlLabelProps) {
  const formControlContext = useFormControlContext();
  return (
    <FormControlLabelContainer
      className="sinoui-form-control-label"
      labelPosition={labelPosition}
      readOnly={control.props.readOnly}
      disabled={control.props.disabled}
      dense={control.props.dense}
      onFocus={formControlContext?.onFocus}
      onBlur={formControlContext?.onBlur}
    >
      {control}
      <span className="sinoui-form-control-label__title">{label}</span>
    </FormControlLabelContainer>
  );
}
