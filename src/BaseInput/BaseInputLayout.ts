import styled from 'styled-components';
import inputResetStyle from './inputResetStyle';

interface Props {
  /**
   * 如果设置为`true`，则输入框处于禁用状态。默认为`false`。
   */
  $disabled?: boolean;
  /**
   * 如果设置为`true`，则输入框会占满宽度。默认为`false`。
   */
  $fullWidth?: boolean;
  /**
   * 输入框文本对齐方式
   */
  $align?: 'start' | 'end';
}

/**
 * 基础输入框的布局组件
 */
const BaseInputLayout = styled.div<Props>`
  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;

  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'text')};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.palette.text.disabled : theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  letter-spacing: ${(props) => props.theme.typography.body1.letterSpacing};
  font-family: ${(props) => props.theme.typography.fontFamily};
  line-height: 1.1875em;

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'};

  > input,
  > textarea {
    padding: 6px 0 7px;
    ${inputResetStyle};
    ${({ $align }) => $align === 'end' && 'text-align: right;'}
  }

  > textarea {
    resize: none;
    overflow: hidden;
  }
`;

export default BaseInputLayout;
