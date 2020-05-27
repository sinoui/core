import React, { useState, useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { BaseInputProps } from '@sinoui/core/BaseInput';
import HelperText from '@sinoui/core/HelperText';
import FormLabel from '@sinoui/core/FormLabel';
import FilledInput from './FilledInput';
import OutlinedInput from './OutlinedInput';
import Input from './Input';
import bemClassNames from '../utils/bemClassNames';
import { cssClasses } from './constant';
import { useFormControlContext } from '../FormControl';
import HelperLine from '../HelperLine';
import isEmptyValue from './isEmptyValue';
import mergeCallbacks from '../utils/mergeCallbacks';

export interface TextInputProps extends BaseInputProps {
  /**
   * 标签内容
   */
  label?: string;
  /**
   * 错误状态
   */
  error?: boolean;
  /**
   * 错误信息
   */
  errorText?: string;
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
  /**
   * 将输入框作为表单控件使用
   */
  field?: boolean;
}

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const focusedVisibleCss = css<{ $focused?: boolean }>`
  & .sinoui-focused-visible {
    visibility: ${({ $focused }) => ($focused ? 'visible' : 'hidden')};
  }

  &:hover .sinoui-focused-visible {
    visibility: visible;
  }

  @media (hover: none) {
    &:hover .sinoui-focused-visible {
      visibility: ${({ $focused }) => ($focused ? 'visible' : 'hidden')};
    }
  }
`;

const TextInputWrapper = styled.div<{
  disabled?: boolean;
  field?: boolean;
  $focused?: boolean;
}>`
  display: ${({ field }) => (field ? 'flex' : 'inline-flex')};
  flex-direction: column;
  align-items: stretch;
  position: relative;
  ${focusedVisibleCss}
`;

/**
 * 文本输入框组件。符合 Material Design Text Field 规范。
 */
const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
  (props, ref) => {
    const {
      variant = 'standard',
      baseClassName = cssClasses.textInput,
      label,
      field,
      value,
      defaultValue,
      disabled,
      required,
      shrink: shrinkProp,
      error,
      errorText,
      placeholder,
      className,
      style,
      helperText,
      readOnly,
      dense,
      startAdornment,
      wrapperProps,
      onFocus,
      onBlur,
      ...other
    } = props;
    const innerLabelRef = useRef<HTMLLabelElement>(null);
    const [focused, setFocused] = useState(false);
    const shrink =
      shrinkProp ||
      focused ||
      !isEmptyValue(value) ||
      !!defaultValue ||
      !!placeholder ||
      !!startAdornment;
    const formControlContext = useFormControlContext();
    const noLabel =
      !label &&
      (!formControlContext || formControlContext.labelLayout !== 'floating');
    const labelRef = label ? innerLabelRef : formControlContext?.labelRef;

    const handleBlur = useMemo(
      () => mergeCallbacks(onBlur, () => setFocused(false)),
      [onBlur],
    );
    const handleFocus = useMemo(
      () => mergeCallbacks(onFocus, () => setFocused(true)),
      [onFocus],
    );

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
      onBlur: handleBlur,
      onFocus: handleFocus,
      startAdornment,
      placeholder,
      value,
      defaultValue,
      noLabel,
      error,
      errorText,
    };

    if (variant === 'outlined') {
      inputProps.notched = shrink;
      inputProps.labelRef = labelRef;
    }

    const helperTextContent = (
      <>
        {error && errorText && <HelperText error>{errorText}</HelperText>}
        {!error && helperText && (
          <HelperText disabled={disabled}>{helperText}</HelperText>
        )}
      </>
    );

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
          field && 'sinoui-form-control',
        )}
        disabled={disabled}
        style={style}
        ref={ref}
        field={field}
        $focused={focused}
      >
        {label && (
          <FormLabel
            layout="floating"
            {...inputState}
            error={!!error}
            variant={variant}
            filled={shrink}
            ref={labelRef}
          >
            {label}
          </FormLabel>
        )}
        <InputComponent {...inputProps} />
        {field ? (
          <HelperLine>{helperTextContent}</HelperLine>
        ) : (
          helperTextContent
        )}
      </TextInputWrapper>
    );
  },
);

TextInput.sinouiName = 'TextInput';

if (process.env.NODE_ENV === 'development') {
  TextInput.displayName = 'TextInput';
}

export default TextInput;
