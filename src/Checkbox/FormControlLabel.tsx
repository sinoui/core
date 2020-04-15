import React from 'react';
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
  control: any;
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
  return (
    <FormControlLabelContainer
      className="sinoui-form-control-label"
      labelPosition={labelPosition}
      readOnly={control.props.readOnly}
      disabled={control.props.disabled}
      dense={control.props.dense}
    >
      {control}
      <span className="sinoui-form-control-label__title">{label}</span>
    </FormControlLabelContainer>
  );
}
