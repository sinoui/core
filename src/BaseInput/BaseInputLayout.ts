import styled from 'styled-components';
import inputResetStyle from './inputResetStyle';

interface Props {
  /**
   * 如果设置为`true`，则输入框处于禁用状态。默认为`false`。
   */
  disabled?: boolean;
  /**
   * 如果设置为`true`，则输入框会占满宽度。默认为`false`。
   */
  $fullWidth?: boolean;
  /**
   * 输入框文本对齐方式
   */
  $align?: 'start' | 'end';
  /**
   * 是否是多行输入框
   */
  $multiline?: boolean;
  /**
   * 是否显示clear图标
   */
  $isShowClear?: boolean;
  /**
   * 是否有后缀元素
   */
  $hasEndAdornment?: boolean;
}

/**
 * 基础输入框的布局组件
 */
const BaseInputLayout = styled.div<Props>`
  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  letter-spacing: ${(props) => props.theme.typography.body1.letterSpacing};
  font-family: ${(props) => props.theme.typography.fontFamily};
  line-height: 1.5em;

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'};

  > .sinoui-base-input__input {
    padding: 3.5px 0 4.5px;
    ${inputResetStyle};
    ${({ $align }) => $align === 'end' && 'text-align: right;'}
  }

  &.sinoui-base-input--multiline > textarea {
    resize: none;
    padding: 0;
  }

  .sinoui-base-input__clear {
    display: ${({ $hasEndAdornment }) => ($hasEndAdornment ? 'none' : 'flex')};
    font-size: 18px;
    cursor: pointer;
  }

  &:hover {
    .sinoui-input-adornment--end {
      display: ${({ $isShowClear }) => ($isShowClear ? 'none' : 'flex')};
    }

    .sinoui-base-input__clear {
      display: flex;
    }
  }

  ${({ $multiline }) => $multiline && 'padding: 3.5px 0 4.5px;'}
`;

export default BaseInputLayout;
