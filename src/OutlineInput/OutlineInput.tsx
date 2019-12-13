import React, { useState, useCallback } from 'react';
import BaseInput, { BaseInputProps } from '@sinoui/core/BaseInput';
import classNames from 'classnames';
import styled from 'styled-components';
import NotchedOutline from './NotchedOutline';
import generateClassName from '../utils/generateClassName';

export interface OutlineInputProps extends BaseInputProps {
  error?: boolean;
  warning?: boolean;
  focused?: boolean;
  notched?: boolean;
  labelWidth?: number;
  dense?: boolean;
}

const StyledBaseInput = styled(BaseInput)<
  BaseInputProps & {
    error?: boolean;
    warning?: boolean;
    focused?: boolean;
    dense?: boolean;
  }
>`
  position: relative;
  border-radius: 4px;

  > fieldset {
    border-color: ${(props) =>
      props.theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.23)'
        : 'rgba(255, 255, 255, 0.23)'};
  }

  &:hover {
    > fieldset {
      border-color: ${(props) => props.theme.palette.text.primary};
    }
  }

  && {
    > fieldset {
      ${(props) =>
        props.focused &&
        `border-color:${props.theme.palette.primary[500]};border-width:2px;`};
      ${(props) =>
        props.error && `border-color:${props.theme.palette.error[500]}`};
      ${(props) =>
        props.disabled &&
        `border-color:${props.theme.palette.action.disabled}`};
    }
  }

  > input {
    padding: 18.5px 14px;

    ${(props) => props.dense && `padding-top:10.5px;padding-bottom:10.5px;`}
  }
`;

export default function OutlineInput(props: OutlineInputProps) {
  const {
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    type = 'text',
    ref,
    className,
    error,
    warning,
    notched,
    value,
    defaultValue,
    placeholder,
    labelWidth,
    disabled,
    readOnly,
    dense,
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
      renderSuffix={(_state) => (
        <NotchedOutline
          notched={
            typeof notched !== 'undefined'
              ? notched
              : focused || !!value || !!defaultValue || !!placeholder
          }
          labelWidth={labelWidth}
        />
      )}
      error={error}
      warning={warning}
      focused={focused}
      inputComponent={inputComponent}
      multiline={multiline}
      type={type}
      ref={ref}
      dense={dense}
      disabled={disabled}
      readOnly={readOnly}
      {...other}
      className={classNames(
        generateClassName('sinoui-outlined-input', {
          focused,
          error,
          disabled,
          readOnly,
          dense,
        }),
        className,
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
