import React from 'react';
import styled from 'styled-components';
import Label from '@sinoui/core/Label';

/**
 * 表单项中的标签容器组件属性
 *
 * @export
 * @interface FormLabelContainerProps
 */
export interface FormLabelContainerProps {
  /**
   * 标签文本。
   */
  children: React.ReactNode;
  /**
   * 标签宽度
   */
  width?: number | string;
  /**
   * label要绑定元素的id
   */
  name?: string;
  /**
   * 文本对齐方式
   */
  align?: 'left' | 'right' | 'center' | 'justify';
  /**
   * 文本之后添加冒号
   */
  colon?: boolean;
  /**
   * 警告状态
   */
  warning?: boolean;
  /**
   * 错误状态
   */
  error?: boolean;
  /**
   * 焦点状态
   */
  focused?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 必填项
   */
  required?: boolean;
  /**
   * label要绑定元素的id
   */
  htmlFor?: string;
  /**
   * 是否垂直显示
   *
   * @type {boolean}
   * @memberof FormLabelContainerProps
   */
  vertical?: boolean;
}

/**
 * @private
 * 表单标签容器
 */
const FormLabelContainer = styled(Label).attrs(
  ({ htmlFor, name }: FormLabelContainerProps) => ({
    htmlFor: htmlFor || name,
  }),
)<FormLabelContainerProps>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.vertical ? '100%' : props.width || '120px')};
  ${(props) => !props.vertical && 'min-height: 36px;'};
  box-sizing: border-box;
  padding: 4px 8px;
  padding-left: 0;
  ${(props) =>
    props.colon &&
    `
    &::after {
      content: ":";
      margin: 0 8px 0 2px;
    }
  `}
`;

export default FormLabelContainer;
