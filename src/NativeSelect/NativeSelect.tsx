import React from 'react';
import classNames from 'classnames';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import InputAdornment from '@sinoui/core/InputAdornment';
import styled from 'styled-components';
import NativeSelectInput from './NativeSelectInput';
import ArrowDropDownIcon from './ArrowDropDownIcon';

export interface Props extends Omit<TextInputProps, 'value'> {
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 是否多选
   */
  multiple?: boolean;
}

const NativeSelectLayout = styled(TextInput)``;

/**
 * 原生的选择框组件
 */
const NativeSelect = React.forwardRef<HTMLElement, Props>(function Select(
  props,
  ref,
) {
  const {
    children,
    inputProps,
    label,
    multiple = false,
    variant = 'standard',
    error,
    disabled,
    helperText,
    dense,
    value,
    className,
    readOnly,
    ...other
  } = props;

  const inputComponent = NativeSelectInput;

  return React.cloneElement(<NativeSelectLayout />, {
    inputComponent,
    inputProps: {
      children,
      multiple,
      ...inputProps,
    },
    ref,
    label,
    className: classNames('sinoui-native-select-layout', className),
    endAdornment: multiple ? null : (
      <InputAdornment position="end">
        <ArrowDropDownIcon />
      </InputAdornment>
    ),
    value,
    disabled,
    readOnly,
    error,
    variant,
    helperText,
    shrink: multiple,
    dense,
    ...other,
  });
});

export default NativeSelect;
