import React, { useState, useCallback } from 'react';
import BaseInput, { BaseInputProps } from '@sinoui/core/BaseInput';
import styled from 'styled-components';
import NotchedOutline from './NotchedOutline';
import bemClassNames from '../utils/bemClassNames';
import { DISABLED_INPUT_LINE_COLOR } from './constant';

export interface OutlineInputProps extends BaseInputProps {
  /**
   * 如果设置为 `true`，输入框将显示为错误状态。
   */
  error?: boolean;
  /**
   * 如果设置为 `true`，轮廓上出现缺口，并且标签上浮到轮廓缺口处。
   */
  notched?: boolean;
  /**
   * 标签宽度。用来设置轮廓缺口的宽度。
   */
  labelWidth?: number;
  /**
   * 密集模式
   */
  dense?: boolean;
}

const StyledBaseInput = styled(BaseInput)<
  BaseInputProps & {
    error?: boolean;
    focused?: boolean;
    dense?: boolean;
  }
>`
  position: relative;
  border-radius: 4px;

  > fieldset {
    border-color: ${(props) =>
      props.theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.38)'
        : 'rgba(255, 255, 255, 0.38)'};
  }

  :hover {
    > fieldset {
      border-color: ${(props) => props.theme.palette.text.primary};
    }
  }

  && {
    > fieldset {
      ${(props) =>
        props.focused &&
        `border-color:${props.theme.palette.primary.main}; border-width:2px;`};
      ${(props) =>
        props.error && `border-color:${props.theme.palette.error.main}`};
      ${(props) =>
        props.disabled &&
        `border-color:${DISABLED_INPUT_LINE_COLOR[props.theme.palette.type]}`};
    }
  }

  > input,
  > textarea {
    padding: 18.5px 14px;

    ${(props) => props.dense && `padding-top:10.5px;padding-bottom:10.5px;`}
  }
`;

/**
 * 轮廓输入框
 */
export default React.forwardRef<HTMLDivElement, OutlineInputProps>(
  function OutlineInput(props: OutlineInputProps, ref) {
    const {
      fullWidth = false,
      inputComponent = 'input',
      multiline = false,
      type = 'text',
      className,
      error,
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
            notched={typeof notched !== 'undefined' ? notched : !focused}
            labelWidth={labelWidth}
          />
        )}
        error={error}
        focused={focused}
        inputComponent={inputComponent}
        multiline={multiline}
        type={type}
        ref={ref}
        dense={dense}
        disabled={disabled}
        readOnly={readOnly}
        {...other}
        className={bemClassNames(
          'sinoui-outlined-input',
          {
            focused,
            error,
            disabled,
            readOnly,
            dense,
          },
          className,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    );
  },
);
