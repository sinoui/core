import React from 'react';
import styled from 'styled-components';

export interface FormControlLabelContainerProps {
  /**
   * 标签位置
   */
  labelPosition?: 'left' | 'right';
  children: React.ReactNode;
  /**
   * 不可用
   */
  disabled?: boolean;
  /**
   * 只读
   */
  readOnly?: boolean;
  /**
   * true 表示密集模式
   */
  dense?: boolean;
}

const Label = styled.label`
  font-size: ${(props) => props.theme.typography.subtitle1.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: ${(props) => props.theme.typography.subtitle1.fontWeight};
  color: ${(props) => props.theme.palette.text.primary};
  margin: 0;
  padding: 0;
`;

/**
 * 表单控件标签容器组件
 */
const FormControlLabelContainer = styled(Label)<FormControlLabelContainerProps>`
  display: inline-flex;
  flex-direction: ${(props) =>
    props.labelPosition === 'left' ? 'row-reverse' : 'row'};
  align-items: center;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;

  > .sinoui-checkbox,
  > .sinoui-radio {
    flex-shrink: 0;
  }

  > .sinoui-form-control-label__title {
    word-break: break-all;
    word-wrap: break-word;
  }

  cursor: ${(props) =>
    props.readOnly || props.disabled ? 'default' : 'pointer'};
`;

export default FormControlLabelContainer;
