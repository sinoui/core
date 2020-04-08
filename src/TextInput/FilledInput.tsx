import React, { useState, useCallback } from 'react';
import BaseInput, { BaseInputProps } from '@sinoui/core/BaseInput';
import styled, { css } from 'styled-components';
import bemClassNames from '../utils/bemClassNames';
import { INPUT_LINE_COLOR, DISABLED_INPUT_LINE_COLOR } from './constant';

export interface FilledInputProps extends BaseInputProps {
  error?: boolean;
  warning?: boolean;
  focused?: boolean;
  dense?: boolean;
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
      background-color: ${({ theme, error }) =>
        theme.palette[error ? 'error' : 'warning'].main};
      transform: scaleX(${FULL_SCALE_X}) scaleY(${FULL_SCALE_Y});
    }
  }
`;

const disabledunderlineStyle = css`
  &::after {
    height: 0px;
  }

  &::before {
    background-color: ${({ theme }) =>
      DISABLED_INPUT_LINE_COLOR[theme.palette.type]};
  }
`;

const inkbarStyle = css`
  &::after {
    background-color: ${(props) => props.theme.palette.primary.main};
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
    background-color: ${({ theme }) => INPUT_LINE_COLOR[theme.palette.type]};
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
  background-color: ${(props) => props.theme.palette.divider};
`;

const StyledBaseInput = styled(BaseInput)<
  BaseInputProps & { error?: boolean; warning?: boolean; dense?: boolean }
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

  > input,
  > textarea {
    padding: 27px 12px 10px;

    ${(props) => props.dense && `padding-top:23px;padding-bottom:6px;`}
  }
`;

export default React.forwardRef<HTMLDivElement, FilledInputProps>(
  function FilledInput(props, ref) {
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
        error={error}
        warning={warning}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        inputComponent={inputComponent}
        multiline={multiline}
        type={type}
        ref={ref}
        {...other}
        className={bemClassNames(
          'sinoui-filled-input',
          {
            focused,
            error,
            disabled,
            readOnly,
          },
          className,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  },
);
