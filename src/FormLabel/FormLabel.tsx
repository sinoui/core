import styled, { css } from 'styled-components';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';

/**
 * 标签组件属性
 *
 * @export
 * @interface LabelProps
 */
export interface LabelProps {
  /**
   * 是否显示冒号
   */
  colon?: boolean;
  /**
   * 必填项
   */
  required?: boolean;
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
   * 标签处于聚焦状态时的颜色
   */
  color?: string;
  /**
   * 标签布局模式
   */
  layout?: 'floating' | 'shrink' | 'standard';
}

const standardStyle = css`
  justify-content: flex-end;
  align-self: flex-start;
  padding-top: 8px;
  padding-right: 8px;
`;
/**
 * html标签组件
 *
 * @ReactComponent
 */
const Label = styled.label.attrs(() => ({ className: 'sinoui-form-label' }))<
  LabelProps
>`
  display: flex;
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${({ theme }) => theme.palette.text.primary};
  color: ${({ color = 'primary', theme, focused }) =>
    focused && getColorFromTheme(theme, color)};
  color: ${({ theme, disabled }) => disabled && theme.palette.text.disabled};
  margin: 0;
  min-height: 40px;
  width: 160px;
  box-sizing: border-box;

  ${(props) =>
    props.required &&
    `
    &:before {
      content: '*';
      padding: 2px 4px;
    }
  `};

  ${(props) =>
    props.colon &&
    `
    &:after {
      content: ':';
    }
  `};

  ${(props) => props.layout === 'standard' && standardStyle}
`;

export default Label;
