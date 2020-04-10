import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BaseInputProps } from '@sinoui/core/BaseInput';
import classNames from 'classnames';
import FilledInput from './FilledInput';
import OutlinedInput from './OutlinedInput';
import InputLabel from './InputLabel';
import Input from './Input';
import HelperText from './HelperText';
import bemClassNames from '../utils/bemClassNames';
import { cssClasses } from './constant';

export interface TextInputProps extends BaseInputProps {
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
  /**
   * 帮助文字
   */
  helperText?: string;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 基础的class类名。默认为 `sinoui-text-input`。
   */
  baseClassName?: string;
  /**
   * 如果设置为`true`，则输入框的标签一直处于收缩悬浮状态。默认为`false`。
   */
  shrink?: boolean;
}

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const TextInputWrapper = styled.div<{ disabled?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
`;

/**
 * 文本输入框组件。符合 Material Design Text Field 规范。
 */
export default function TextInput(props: TextInputProps) {
  const {
    variant = 'standard',
    baseClassName = cssClasses.textInput,
    label,
    value,
    defaultValue,
    disabled,
    required,
    shrink: shrinkProp,
    error,
    placeholder,
    className,
    helperText,
    readOnly,
    dense,
    startAdornment,
    ...other
  } = props;
  const labelRef = useRef<HTMLLabelElement>(null);
  const [focused, setFocused] = useState(false);
  const shrink =
    shrinkProp ||
    focused ||
    !!value ||
    !!defaultValue ||
    !!placeholder ||
    !!startAdornment;

  const handleBlur = () => {
    if (!readOnly) {
      setFocused(false);
    }
  };

  const handleFocus = () => {
    if (!readOnly) {
      setFocused(true);
    }
  };

  const InputComponent = variantComponent[variant];
  const inputState = {
    required,
    dense,
    disabled,
    error: !!error,
    readOnly,
    focused,
  };

  const inputProps: Record<string, any> = {
    ...other,
    ...inputState,
    startAdornment,
    placeholder,
    value,
    defaultValue,
  };

  if (variant === 'outlined') {
    inputProps.notched = shrink;
    inputProps.labelRef = labelRef;
  }

  return (
    <TextInputWrapper
      className={classNames(
        className,
        bemClassNames(baseClassName, {
          outlined: variant === 'outlined',
          filled: variant === 'filled',
          shrink,
          ...inputState,
        }),
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
    >
      {label && (
        <InputLabel
          {...inputState}
          variant={variant}
          shrink={shrink}
          ref={labelRef}
        >
          {label}
        </InputLabel>
      )}
      <InputComponent {...inputProps} />
      {!!error && (
        <HelperText error variant={variant} dense={dense}>
          {error}
        </HelperText>
      )}
      {!error && helperText && (
        <HelperText disabeld={disabled} variant={variant} dense={dense}>
          {helperText}
        </HelperText>
      )}
    </TextInputWrapper>
  );
}
