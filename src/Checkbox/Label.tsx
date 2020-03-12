import styled from 'styled-components';

/**
 * 标签组件属性
 *
 * @export
 * @interface LabelProps
 */
export interface LabelProps {
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
   * 只读
   */
  readOnly?: boolean;
}

/**
 * html标签组件
 *
 * @ReactComponent
 */
const Label = styled.label<LabelProps>`
  font-size: ${(props) => props.theme.typography.subtitle1.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: ${(props) => props.theme.typography.subtitle1.fontWeight};
  color: ${(props) => props.theme.palette.text.primary};
  margin: 0;
  padding: 0;
  ${(props) =>
    props.required &&
    `
    $:after {
      content: '*';
      padding: 4px;
    }
  `};
`;

export default Label;
