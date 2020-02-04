/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useCallback } from 'react';
import BaseInput, { BaseInputProps } from '@sinoui/core/BaseInput';
import styled, { css } from 'styled-components';
import bemClassNames from '../utils/bemClassNames';

export interface InputProps extends BaseInputProps {
  error?: boolean;
  warning?: boolean;
  focused?: boolean;
  dense?: boolean;
}

const FULL_SCALE_X = 1;
const FULL_SCALE_Y = 1;

const errorOrWarnigStyle = css<InputProps>`
  && {
    &::after {
      background-color: ${(props) =>
        props.theme.palette[props.error ? 'error' : 'warning'][500]};
      transform: scaleX(${FULL_SCALE_X}) scaleY(${FULL_SCALE_Y});
    }
  }
`;

const transformStyle = (props: { focused?: boolean }) => {
  const scaleX = props.focused ? FULL_SCALE_X : 0;
  const scaleY = props.focused ? FULL_SCALE_Y : 0;
  return css`
    transform: scaleX(${scaleX}) scaleY(${scaleY});
  `;
};

const inkbarStyle = css`
  &::after {
    background-color: ${(props) =>
      props.theme.palette.primary[
        props.theme.palette.type === 'light' ? 700 : 300
      ]};
    left: 0;
    bottom: 0;
    content: '';
    height: 2px;
    position: absolute;
    right: 0;
    transition: ${(props) =>
      props.theme.transitions.create('transform', {
        duration: props.theme.transitions.duration.shorter,
        easing: props.theme.transitions.easing.easeOut,
      })};
    pointer-events: none;
    ${transformStyle};
  }
`;

const underlineStyle = css<InputProps>`
  &::before {
    background-color: ${(props) => props.theme.palette.input.bottomLine};
    left: 0;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    right: 0;
    transition: ${(props) =>
      props.theme.transitions.create('background-color', {
        duration: props.theme.transitions.duration.shorter,
        easing: props.theme.transitions.easing.easeInOut,
      })};
    pointer-events: none;
    transform: scaleX(${FULL_SCALE_X}) scaleY(${FULL_SCALE_Y});
  }

  &:hover::before {
    ${(props) =>
      !props.disabled &&
      !props.readOnly &&
      !props.error &&
      `background-color: ${props.theme.palette.text.primary};
  height: 2px;`};
  }
`;

const disabledUnderlineStyle = css`
  &::before {
    background: transparent;
    background-image: linear-gradient(
      to right,
      ${(props) => props.theme.palette.input.bottomLine} 33%,
      transparent 0%
    );
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 5px 1px;
  }
`;

const StyledBaseInput = styled(BaseInput)<{
  error?: boolean;
  warning?: boolean;
  dense?: boolean;
}>`
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.text.disabled
      : props.theme.palette.input.inputText};
  ${(props) => (props.error || props.warning) && errorOrWarnigStyle};
  ${(props) => !props.disabled && inkbarStyle};
  ${(props) => !props.error && underlineStyle};
  ${(props) => props.disabled && disabledUnderlineStyle};

  > input {
    ${(props) => props.dense && `padding-top:3px;`}
  }

  label ~ & {
    margin-top: 16px;
  }

  &::before,
  &::after {
    position: absolute;
    bottom: 0px;
    /*
     * 修复缺陷：输入框的下划线不出现
     *
     * 原因：IE对于小高度的元素不会正常展示。参考
     * [Inability to Have Elements with Small Heights][link1]
     *
     * * [link1]: https://code.tutsplus.com/tutorials/9-most-common-ie-bugs-and-how-to-fix-them--net-7764
     */
    overflow: hidden;
    font-size: 0px;
  }
`;

/**
 * 输入框
 */
export default React.forwardRef<HTMLDivElement, InputProps>(function Input(
  props: InputProps,
  ref,
) {
  const {
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    type = 'text',
    className,
    error,
    warning,
    disabled,
    readOnly,
    dense,
    onFocus,
    onBlur,
    ...other
  } = props;
  const [focused, setFocused] = useState(false);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!props.readOnly) {
        setFocused(false);
        if (onBlur) {
          onBlur(event);
        }
      }
    },
    [onBlur, props.readOnly],
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!props.readOnly) {
        setFocused(true);
        if (onFocus) {
          onFocus(event);
        }
      }
    },
    [onFocus, props.readOnly],
  );

  return (
    <StyledBaseInput
      fullWidth={fullWidth}
      error={error}
      warning={warning}
      focused={focused}
      inputComponent={inputComponent}
      multiline={multiline}
      type={type}
      ref={ref}
      disabled={disabled}
      readOnly={readOnly}
      dense={dense}
      {...other}
      className={bemClassNames(
        'sinoui-input',
        {
          disabled,
          readOnly,
          error,
          focused,
          dense,
        },
        className,
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});
