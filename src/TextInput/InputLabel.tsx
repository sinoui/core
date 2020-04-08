import React from 'react';
import styled, { css } from 'styled-components';

export interface InputLabelProps {
  required?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  focused?: boolean;
  error?: boolean;
  /**
   * input的渲染形式
   */
  variant?: 'standard' | 'filled' | 'outlined';
  ref?: any;
  dense?: boolean;
}

const animateStyle = css`
  transition: ${(props) =>
    props.theme.transitions.create('transform', {
      duration: props.theme.transitions.duration.shorter,
      easing: props.theme.transitions.easing.easeOut,
    })};
`;

const shrinkStyle = css<InputLabelProps>`
  transform: translate(0, 1.5px) scale(0.75);
  transform-origin: top left;
  ${(props) =>
    props.variant === 'filled' &&
    `transform: translate(12px, 10px) scale(0.75);`}
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

const InputLabel = styled.label<InputLabelProps>`
  transform-origin: top left;
  position: absolute;
  left: 0;
  top: 0;
  color: ${(props) => props.theme.palette.text.secondary};
  line-height: 1;
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
`;

export default InputLabel;
