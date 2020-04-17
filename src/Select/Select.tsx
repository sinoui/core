import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import InputAdornment from '@sinoui/core/InputAdornment';
import SelectInput from './SelectInput';
import ArrowDropDownIcon from './ArrowDropDownIcon';

const StyledTextInput = styled(TextInput)<{ $isOpen: boolean }>`
  > .sinoui-base-input {
    cursor: ${({ disabled, readOnly }) =>
      disabled || readOnly ? 'default' : 'pointer'};
  }

  > .sinoui-base-input > .sinoui-input-adornment--end > svg {
    transition: ${({ theme }) =>
      theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      })};
  }

  &.sinoui-select--focused
    > .sinoui-base-input
    > .sinoui-input-adornment--end
    > svg {
    color: ${(props) => props.theme.palette.primary.main};
  }

  &.sinoui-select--error
    > .sinoui-base-input
    > .sinoui-input-adornment--end
    > svg {
    color: ${(props) => props.theme.palette.error.main};
  }

  & .sinoui-input-adornment--end {
    pointer-events: none;
  }

  & .sinoui-input-adornment--end > svg {
    ${({ $isOpen }) => $isOpen && `transform:rotate(180deg);`}
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
  renderValue?: (value?: string | string[]) => React.ReactNode;
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 最小宽度
   */
  minWidth?: number;
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
  const [open, setOpen] = useState(false);
  const {
    children,
    inputProps,
    multiple = false,
    renderValue,
    className,
    minWidth,
    onChange,
    value,
    allowClear = true,
    ...other
  } = props;

  const inputComponent = SelectInput;

  /**
   * 点击清除按钮时的回调函数
   */
  const onClear = useCallback(() => {
    const defaultValue = multiple ? [] : '';
    if (onChange) {
      onChange(defaultValue);
    }
  }, [multiple, onChange]);

  const onOpen = useCallback(() => {
    if (props.readOnly || props.disabled) {
      return;
    }
    setOpen(true);
  }, [props.disabled, props.readOnly]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const inputCompProps = {
    children,
    multiple,
    minWidth,
    renderValue,
    open,
    onOpen,
    onClose,
    ...inputProps,
  };

  return (
    <StyledTextInput
      $isOpen={open}
      inputComponent={inputComponent}
      inputProps={inputCompProps}
      ref={ref}
      allowClear={allowClear}
      baseClassName="sinoui-select"
      className={classNames('sinoui-select-base-layout', className)}
      onClear={onClear}
      endAdornment={
        <InputAdornment position="end">
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
