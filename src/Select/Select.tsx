import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import InputAdornment from '@sinoui/core/InputAdornment';
import SelectInput from './SelectInput';
import ArrowDropDownIcon from '../svg-icons/ArrowDropDownIcon';
import type SelectItem from './SelectItem';
import useMultiRefs from '../utils/useMultiRefs';

const StyledTextInput = styled(TextInput)<{ $isOpen: boolean }>`
  > .sinoui-base-input {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }

  &.sinoui-select--focused .sinoui-input-adornment--end .sinoui-svg-icon {
    color: ${(props) => props.theme.palette.primary.main};
  }

  &.sinoui-select--error .sinoui-input-adornment--end .sinoui-svg-icon {
    color: ${(props) => props.theme.palette.error.main};
  }

  & .sinoui-select__state-icon {
    pointer-events: none;
    transition: ${({ theme }) =>
      theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      })};
    ${({ $isOpen }) => $isOpen && 'transform: rotate(180deg);'}
  }
`;

export interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange'
  > {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 多选
   */
  multiple?: boolean;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value?: string | string[]) => void;
  /**
   * 值的渲染方式
   */
  renderValue?: (
    value: string | string[] | undefined,
    items: SelectItem[],
  ) => React.ReactNode;
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 自定义class名称
   */
  className?: string;
}

/**
 * 选择框组件
 */
const Select = React.forwardRef<HTMLDivElement, Props>(function Select(
  props,
  ref,
) {
  const selectRef = useRef<HTMLDivElement>(null);
  const handleRef = useMultiRefs(selectRef, ref);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const {
    children,
    inputProps,
    multiple = false,
    renderValue,
    onChange,
    value,
    allowClear = true,
    ...other
  } = props;

  const inputComponent = SelectInput;

  /**
   * 点击清除按钮时的回调函数
   */
  const onClear = () => {
    const defaultValue = multiple ? [] : '';
    if (onChange) {
      onChange(defaultValue);
    }
  };

  const onOpen = useCallback(() => {
    if (props.readOnly || props.disabled) {
      return;
    }
    setOpen(true);
    setWidth(selectRef.current ? selectRef.current.clientWidth : 0);
  }, [props.disabled, props.readOnly]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const inputCompProps = {
    children,
    multiple,
    renderValue,
    open,
    onOpen,
    onClose,
    menuMinWidth: width,
    ...inputProps,
  };

  return (
    <StyledTextInput
      $isOpen={open}
      inputComponent={inputComponent}
      inputProps={inputCompProps}
      ref={handleRef}
      allowClear={allowClear}
      baseClassName="sinoui-select"
      onClear={onClear}
      endAdornment={
        <InputAdornment position="end" className="sinoui-select__state-icon">
          <ArrowDropDownIcon size={24} />
        </InputAdornment>
      }
      value={value as any}
      onClick={onOpen}
      onChange={onChange as any}
      {...other}
    />
  );
});

export default Select;
