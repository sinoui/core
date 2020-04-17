import styled, { css } from 'styled-components';
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

const enterTransitionCss = css`
  transition: ${({ theme: { transitions } }) =>
    transitions.create(['transform', 'opacity', 'color'], {
      duration: transitions.duration.short,
      easing: transitions.easing.easeIn,
    })};
`;

const exitTransitionCss = css`
  transition: ${({ theme: { transitions } }) =>
    transitions.create(['transform', 'opacity', 'color'], {
      duration: transitions.duration.shortest,
      easing: transitions.easing.easeOut,
    })};
`;

/**
 * 清除图标与后缀装饰器共存时的样式
 */
const clearIconWithEndAdornmentCss = css`
  & > .sinoui-input-adornment--end {
    opacity: 1;
    ${enterTransitionCss}
  }

  & > .sinoui-base-input__input {
    margin-right: -26px;
  }

  & > .sinoui-base-input__clear {
    transform: translateX(29px);
    opacity: 0;
    pointer-events: none;
    ${exitTransitionCss}
  }

  &:hover > {
    .sinoui-input-adornment--end {
      opacity: 0;
      pointer-events: none;
      ${exitTransitionCss}
    }

    .sinoui-base-input__clear {
      opacity: 1;
      pointer-events: auto;
      ${enterTransitionCss}
    }
  }
`;

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
    outline: none;
    flex: 1 1 auto;
    padding: 3.5px 0 4.5px;
    height: 1.5em;
    min-height: 1.5em;
    caret-color: ${({ theme }) => theme.palette.primary.main};
    ${({ $align }) => $align === 'end' && 'text-align: right;'}
  }

  > input.sinoui-base-input__input,
  > textarea.sinoui-base-input__input {
    ${inputResetStyle};
  }

  &.sinoui-base-input--multiline > textarea {
    resize: none;
    padding: 0;
  }

  .sinoui-base-input__clear {
    width: 18px;
  }

  .sinoui-base-input__clear > .sinoui-svg-icon {
    font-size: 18px;
    cursor: pointer;
  }

  ${({ $isShowClear, $hasEndAdornment }) =>
    $isShowClear && $hasEndAdornment && clearIconWithEndAdornmentCss}

  ${({ $multiline }) => $multiline && 'padding: 3.5px 0 4.5px;'}
`;

export default BaseInputLayout;
