import styled from 'styled-components';

export interface FormLabelContentProps {
  /**
   * 是否为必填
   */
  required?: boolean;

  /**
   * 文本对齐方式
   */
  align?: 'left' | 'right' | 'center' | 'justify';
  /**
   * 是否是垂直布局
   */
  vertical?: boolean;
}

/**
 * 表单标签内容组件
 *
 * @ReactComponent
 */
const FormLabelContent = styled.div<FormLabelContentProps>`
  display: block;
  flex: 1;
  text-align: ${(props) => (props.vertical ? 'left' : props.align)};
  ${(props) =>
    props.align === 'justify' &&
    `text-justify:distribute-all-lines;text-align-last:justify;`}
  ${(props) =>
    props.required &&
    `${props.align === 'right' ? '&::before' : '&::after'} {
    content: "*";
    padding: 0 4px;
  }`};
`;

export default FormLabelContent;
