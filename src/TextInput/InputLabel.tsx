import styled, { css } from 'styled-components';
import bemClassNames from '../utils/bemClassNames';
import { cssClasses } from './constant';

export interface InputLabelProps {
  /**
   * 如果设置为`true`，则表示必填。
   */
  required?: boolean;
  /**
   * 如果设置为`true`，则表示禁用。
   */
  disabled?: boolean;
  /**
   * 如果设置为`true`，则表示标签处于收缩悬浮状态。
   */
  shrink?: boolean;
  /**
   * 如果设置为`true`，则表示输入框处于聚焦状态。
   */
  focused?: boolean;
  /**
   * 如果设置为`true`，则表示输入框处于错误状态。
   */
  error?: boolean;
  /**
   * input的渲染形式
   */
  variant?: 'standard' | 'filled' | 'outlined';
  /**
   * 如果设置为`true`，则表示输入框处于密级模式。
   */
  dense?: boolean;
}

const animateStyle = css`
  transition: ${(props) =>
    props.theme.transitions.create(['transform', 'color'], {
      duration: props.theme.transitions.duration.shorter,
      easing: props.theme.transitions.easing.easeOut,
    })};
`;

const shrinkStyle = css<InputLabelProps>`
  transform: translate(0, 1.5px) scale(0.75);
  transform-origin: top left;
  ${(props) =>
    props.variant === 'filled' &&
    `transform: translate(12px, 9px) scale(0.75);`}
  ${(props) =>
    props.variant === 'outlined' &&
    `transform: translate(14px, -6px) scale(0.75);`}
`;

const denseShrinkLabelStyle = css<InputLabelProps>`
  ${(props) =>
    props.variant === 'filled' &&
    `transform: translate(12px, 7px) scale(0.75);`}
`;

const errorStyle = css`
  color: ${(props) => props.theme.palette.error.main};
`;

const filledLabelStyle = css<{ dense?: boolean }>`
  transform: translate(12px, 20px) scale(1);
  z-index: 1;
  pointer-events: none;
  ${(props) => props.dense && ` transform: translate(12px, 17px) scale(1);`}
`;

const outlinedlineStyle = css<InputLabelProps>`
  transform: translate(14px, 20px) scale(1);
  z-index: 1;
  pointer-events: none;

  ${(props) => props.dense && ` transform: translate(14px, 12px) scale(1);`}
`;

const InputLabel = styled.label.attrs<InputLabelProps>(
  ({ disabled, error, focused, variant, dense, shrink }) => ({
    className: bemClassNames(cssClasses.inputLabel, {
      disabled,
      error: !!error,
      focused,
      filled: variant === 'filled',
      outlined: variant === 'outlined',
      dense,
      shrink,
    }),
  }),
)<InputLabelProps>`
  transform-origin: top left;
  position: absolute;
  left: 0;
  top: 0;
  color: ${(props) => props.theme.palette.text.secondary};
  line-height: 1.15;
  font-size: ${(props) => props.theme.typography.subtitle1.fontSize};
  transform: translate(0, ${(props) => props.theme.spacing.unit * 3}px) scale(1);
  ${(props) => props.variant === 'filled' && filledLabelStyle};
  ${(props) => props.variant === 'outlined' && outlinedlineStyle};
  ${(props) => props.disabled && `color: ${props.theme.palette.text.disabled}`};
  ${(props) => !props.disabled && animateStyle};
  ${(props) => props.shrink && shrinkStyle};
  ${(props) => props.dense && props.shrink && denseShrinkLabelStyle};
  ${(props) => props.focused && `color: ${props.theme.palette.primary.main}`};
  ${(props) => props.error && errorStyle};
  ${(props) =>
    props.required &&
    `
    &::after {
      content: '*';
      padding: 4px;
    }
  `}
  will-change: transform;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default InputLabel;
