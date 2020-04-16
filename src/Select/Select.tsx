import React, { useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import InputAdornment from '@sinoui/core/InputAdornment';
import SelectInput from './SelectInput';
import ArrowDropDownIcon from './ArrowDropDownIcon';

const StyledTextInput = styled(TextInput)`
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
`;

export interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange'
  > {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 多选
   */
  multiple?: boolean;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string | string[]) => void;
  /**
   * 弹窗出现时的回调函数
   */
  onOpen?: () => void;
  /**
   * 弹窗消失时的回调函数
   */
  onClose?: () => void;
  /**
   * 是否显示弹窗
   */
  open?: boolean;
  /**
   * 值的渲染方式
   */
  renderValue?: (value: string | string[]) => void;
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
const Select = React.forwardRef<HTMLElement, Props>(function Select(
  props,
  ref,
) {
  const {
    children,
    inputProps,
    label,
    multiple = false,
    onClose,
    onOpen,
    open,
    renderValue,
    variant = 'standard',
    error,
    disabled,
    helperText,
    dense,
    value,
    className,
    readOnly,
    minWidth,
    onChange,
    ...other
  } = props;

  const inputComponent = SelectInput;

  /**
   * 点击清除按钮时的回调函数
   */
  const onClear = useCallback(
    (event: React.MouseEvent<HTMLOrSVGElement>) => {
      event.preventDefault();
      event.persist();
      event.stopPropagation();
      const defaultValue = multiple ? [] : '';
      if (onChange) {
        onChange(defaultValue);
      }
    },
    [multiple, onChange],
  );

  return React.cloneElement(<StyledTextInput />, {
    inputComponent,
    inputProps: {
      children,
      multiple,
      ...{
        minWidth,
        onClose,
        onOpen,
        open,
        renderValue,
      },
      ...inputProps,
    },
    ref,
    label,
    className: classNames('sinoui-select-base-layout', className),
    baseClassName: 'sinoui-select',
    endAdornment: (
      <InputAdornment position="end">
        <ArrowDropDownIcon size={24} />
      </InputAdornment>
    ),
    value,
    disabled,
    readOnly,
    error,
    variant,
    onClear,
    onChange,
    helperText,
    dense,
    type: 'hidden',
    ...other,
  });
});

export default Select;
