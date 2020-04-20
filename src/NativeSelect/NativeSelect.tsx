import React from 'react';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import InputAdornment from '@sinoui/core/InputAdornment';
import NativeSelectInput from './NativeSelectInput';
import ArrowDropDownIcon from './ArrowDropDownIcon';

export interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange'
  > {
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string | string[]) => void;
}

/**
 * 原生的选择框组件
 */
const NativeSelect = React.forwardRef<HTMLDivElement, Props>(function Select(
  props,
  ref,
) {
  const {
    children,
    inputProps,
    value,
    onChange,
    multiple = false,
    variant = 'standard',
    ...other
  } = props;

  const inputCompProps = {
    children,
    multiple,
    variant,
    ...inputProps,
  };

  return (
    <TextInput
      inputComponent={NativeSelectInput}
      inputProps={inputCompProps}
      baseClassName="sinoui-native-select"
      ref={ref}
      endAdornment={
        multiple ? null : (
          <InputAdornment position="end">
            <ArrowDropDownIcon />
          </InputAdornment>
        )
      }
      shrink={multiple}
      variant={variant}
      value={value as any}
      onChange={onChange as any}
      {...other}
    />
  );
});

export default NativeSelect;
