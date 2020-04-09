import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { BaseInputProps } from '@sinoui/core/BaseInput';
import FilledInput from './FilledInput';
import OutlineInput from './OutlineInput';
import InputLabel from './InputLabel';
import Input from './Input';
import HelperText from './HelperText';
import bemClassNames from '../utils/bemClassNames';

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
   * 标签宽度
   */
  labelWidth?: number;
  /**
   * 帮助文字
   */
  helperText?: string;
  /**
   * 密集模式
   */
  dense?: boolean;
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
  margin: 0;
  border: 0px;
  position: relative;
`;

export default function TextInput(props: TextInputProps) {
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
    className,
    labelWidth: labelWidthProp = 0,
    helperText,
    readOnly,
    dense,
    startAdornment,
    ...other
  } = props;
  const [focused, setFocused] = useState(false);
  const [labelWidth, setLabelWidth] = useState(labelWidthProp);
  const labelRef = useRef<HTMLLabelElement | null>(null);

  const shrink = useMemo(
    () =>
      focused || !!value || !!defaultValue || !!placeholder || !!startAdornment,
    [defaultValue, focused, startAdornment, placeholder, value],
  );

  const shrinkRef = useRef(shrink);

  useEffect(() => {
    if (labelWidthProp) {
      setLabelWidth(labelWidthProp);
      return;
    }
    if (labelRef && labelRef.current) {
      const { width } = labelRef.current.getBoundingClientRect();
      setLabelWidth(width / (shrinkRef.current ? 0.75 : 1));
    }
  }, [labelWidthProp]);

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

  const InputComponent = variantComponent[variant];

  return (
    <TextInputWrapper className={className}>
      {label && (
        <InputLabel
          disabled={disabled}
          focused={focused}
          shrink={shrink}
          required={required}
          error={!!error}
          variant={variant}
          ref={labelRef}
          dense={dense}
          className={bemClassNames('sinoui-input-label', {
            disabled,
            error: !!error,
            focused,
            readOnly,
            filled: variant === 'filled',
            outlined: variant === 'outlined',
            dense,
          })}
        >
          {label}
        </InputLabel>
      )}
      <InputComponent
        {...other}
        startAdornment={startAdornment}
        notched={shrink}
        required={required}
        dense={dense}
        disabled={disabled}
        error={!!error}
        readOnly={readOnly}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        labelWidth={labelWidth}
      />
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
