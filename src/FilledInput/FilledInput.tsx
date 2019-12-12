import React, { useState, useCallback } from 'react';
import BaseInput, { BaseInputProps } from '@sinoui/core/BaseInput';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

export interface FilledInputProps extends BaseInputProps {
  error?: string;
  warning?: boolean;
  focused?: boolean;
}

const FULL_SCALE_X = 1;
const FULL_SCALE_Y = 1;

const transformStyle = (props: { focused?: boolean }) => {
  const scaleX = props.focused ? FULL_SCALE_X : 0;
  const scaleY = props.focused ? FULL_SCALE_Y : 0;
  return css`
    transform: scaleX(${scaleX}) scaleY(${scaleY});
  `;
};

const errorOrWarnigStyle = css<FilledInputProps>`
  && {
    &::after {
      background-color: ${(props) =>
        props.theme.palette[props.error ? 'error' : 'warning'][500]};
      transform: scaleX(${FULL_SCALE_X}) scaleY(${FULL_SCALE_Y});
    }
  }
`;

const disabledunderlineStyle = css`
  &::after {
    height: 0px;
  }

  &::before {
    height: 0px;
  }
`;

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

const underlineStyle = css<FilledInputProps>`
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
  `};
  }
`;

const disabledBackgroundStyle = css`
  background-color: ${(props) => props.theme.palette.text.divider};
`;

const StyledBaseInput = styled(BaseInput)<
  BaseInputProps & { error?: boolean; warning?: boolean }
>`
  position: relative;
  background-color: ${(props) =>
    props.theme.palette.type === 'light'
      ? 'rgba(0,0,0,0.09)'
      : 'rgba(255,255,255,0.09)'};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: ${(props) =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shorter,
      easing: props.theme.transitions.easing.easeOut,
    })};

  &:hover {
    ${(props) =>
      !props.disabled &&
      !props.readOnly &&
      !props.error &&
      `background-color: ${
        props.theme.palette.type === 'light'
          ? 'rgba(0,0,0,0.13)'
          : 'rgba(255,255,255,0.13)'
      };
      cursor:pointer;
  `};
  }
  ${(props) => !props.disabled && inkbarStyle};
  ${(props) => !props.error && underlineStyle};
  ${(props) => (props.error || props.warning) && errorOrWarnigStyle};
  ${(props) => props.disabled && disabledunderlineStyle};
  ${(props) => props.disabled && disabledBackgroundStyle};

  > input {
    padding: 27px 12px 10px;
  }
`;

export default function FilledInput(props: FilledInputProps) {
  const {
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    type = 'text',
    ref,
    className,
    error,
    warning,
    ...other
  } = props;
  const [focused, setFocused] = useState(false);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!props.readOnly) {
        setFocused(false);
        if (props.onBlur) {
          props.onBlur(event);
        }

        if (props.inputProps && props.inputProps.onBlur) {
          props.inputProps.onBlur(event);
        }
      }
    },
    [props],
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!props.readOnly) {
        setFocused(true);
        if (props.onFocus) {
          props.onFocus(event);
        }

        if (props.inputProps && props.inputProps.onFocus) {
          props.inputProps.onFocus(event);
        }
      }
    },
    [props],
  );

  return (
    <StyledBaseInput
      fullWidth={fullWidth}
      error={!!error}
      warning={warning}
      focused={focused}
      inputComponent={inputComponent}
      multiline={multiline}
      type={type}
      ref={ref}
      {...other}
      className={classNames('sinoui-filled-input', className)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
