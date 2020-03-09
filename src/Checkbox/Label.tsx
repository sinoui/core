import styled from 'styled-components';
import { Theme } from '@sinoui/theme';

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
  readOnly?: boolean;
}

/**
 * 获取文本颜色
 *
 * @param {LabelProps} props Label组件的属性对象
 *
 * @param {string} 返回文本颜色值
 */
export function getTextColor(
  props: LabelProps & {
    theme: Theme;
  },
) {
  if (props.warning) {
    return props.theme.palette.warning.main[500];
  } else if (props.error) {
    return props.theme.palette.error.main[500];
  } else if (props.focused && !props.readOnly) {
    return props.theme.palette.primary.main[500];
  } else if (props.disabled) {
    return props.theme.palette.text.disabled;
  }

  return props.theme.typography.subtitle1.color;
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
  color: ${(props) => getTextColor(props)};
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
