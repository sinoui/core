import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { BaseInputProps } from '@sinoui/core/BaseInput';
import FilledInput from '@sinoui/core/FilledInput';
import OutlineInput from '@sinoui/core/OutlineInput';
import InputLabel from './InputLabel';
import Input from '../Input';

export interface TextInputFieldProps extends BaseInputProps {
  /**
   * 标签内容
   */
  label?: string;
  /**
   * 错误信息
   */
  error?: string;
  /**
   * input的渲染形式
   */
  variant?: 'standard' | 'filled' | 'outlined';
  labelWidth?: number;
}

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlineInput,
};

const TextInputWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 0px;
  padding: 0;
  margin-top: ${(props) => props.theme.spacing.unit * 2}px;
  margin-bottom: ${(props) => props.theme.spacing.unit}px;
  border: 0px;
  position: relative;
`;

export default function TextInputField(props: TextInputFieldProps) {
  const {
    label,
    value,
    defaultValue,
    disabled,
    onChange,
    required,
    error,
    variant = 'standard',
    placeholder,
    labelWidth: labelWidthProp,
    ...other
  } = props;
  const [focused, setFocused] = useState(false);
  const labelRef = useRef<HTMLLabelElement | undefined>();

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

  const labelWidth = () => {
    if (labelWidthProp) {
      return labelWidthProp;
    }
    if (labelRef && labelRef.current) {
      const { width } = labelRef.current.getBoundingClientRect();
      return width;
    }
    return 0;
  };

  const InputComponent = variantComponent[variant];

  return (
    <TextInputWrapper>
      {label && (
        <InputLabel
          disabled={disabled}
          focused={focused}
          shrink={focused || !!value || !!defaultValue || !!placeholder}
          required={required}
          error={!!error}
          variant={variant}
          ref={labelRef}
        >
          {label}
        </InputLabel>
      )}
      <InputComponent
        {...other}
        required={required}
        error={error}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        labelWidth={labelWidth()}
      />
    </TextInputWrapper>
  );
}
