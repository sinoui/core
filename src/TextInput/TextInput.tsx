import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BaseInputProps } from '@sinoui/core/BaseInput';
import FilledInput from './FilledInput';
import OutlinedInput from './OutlinedInput';
import InputLabel from './InputLabel';
import Input from './Input';
import HelperText from './HelperText';
import bemClassNames from '../utils/bemClassNames';
import { cssClasses } from './constant';
import { useFormControlContext } from '../FormControl';

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
  /**
   * 给根元素指定css样式
   */
  style?: React.CSSProperties;
  /**
   * 给根元素指定属性
   */
  wrapperProps?: Record<string, any>;
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
    style,
    helperText,
    readOnly,
    dense,
    startAdornment,
    wrapperProps,
    ...other
  } = props;
  const innerLabelRef = useRef<HTMLLabelElement>(null);
  const [focused, setFocused] = useState(false);
  const shrink =
    shrinkProp ||
    focused ||
    !!value ||
    !!defaultValue ||
    !!placeholder ||
    !!startAdornment;
  const formControlContext = useFormControlContext();
  const noLabel =
    !label &&
    (!formControlContext || formControlContext.labelLayout !== 'floating');
  const labelRef = label ? innerLabelRef : formControlContext?.labelRef;

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
    error,
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
    noLabel,
    error,
  };

  if (variant === 'outlined') {
    inputProps.notched = shrink;
    inputProps.labelRef = labelRef;
  }

  return (
    <TextInputWrapper
      {...wrapperProps}
      className={bemClassNames(
        baseClassName,
        {
          outlined: variant === 'outlined',
          filled: variant === 'filled',
          shrink,
          noLabel,
          ...inputState,
          error: !!error,
        },
        className,
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      style={style}
    >
      {label && (
        <InputLabel
          {...inputState}
          error={!!error}
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

TextInput.sinouiName = 'TextInput';
