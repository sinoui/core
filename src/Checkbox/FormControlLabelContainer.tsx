import React from 'react';
import styled from 'styled-components';
import Label from './Label';

export interface FormControlLabelContainerProps {
  labelPosition?: 'left' | 'right';
  children: React.ReactNode;
}

/**
 * 表单控件标签容器组件
 */
const FormControlLabelContainer = styled(Label)<FormControlLabelContainerProps>`
  display: inline-flex;
  flex-direction: ${(props) =>
    props.labelPosition === 'left' ? 'row-reverse' : 'row'};
  align-items: flex-start;
  vertical-align: middle;

  > .sinoui-checkbox,
  > .sinoui-radio-button {
    padding-top: 2px;
    flex-shrink: 0;
  }

  > .sinoui-form-control-label__title {
    padding-left: 8px;
    padding-right: 8px;
    word-break: break-all;
    word-wrap: break-word;
  }
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
`;

export default FormControlLabelContainer;
