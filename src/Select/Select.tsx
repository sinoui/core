import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import { Theme } from '@sinoui/theme';
import InputAdornment from '@sinoui/core/InputAdornment';
import SelectInput from './SelectInput';
import ArrowDropDownIcon from './ArrowDropDownIcon';

const iconFocusedStyle = css`
  color: ${(props) => props.theme.palette.primary.main};
  transform: rotate(180deg);
`;

const StyledTextInput = styled(TextInput)`
  > .sinoui-base-input {
    cursor: ${({ disabled, readOnly }) =>
      disabled || readOnly ? 'default' : 'pointer'};
  }

  > .sinoui-base-input > .sinoui-input-adornment--end > svg {
    font-size: 24px;
    transition: ${({ theme }) =>
      theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      })};
    ${(props: { focused?: boolean; theme: Theme }) =>
      props.focused && iconFocusedStyle};
    ${(props) => props.error && `color: ${props.theme.palette.error.main}`};
  }

  > .sinoui-base-input
    > .sinoui-input-adornment--end
    > .sinoui-base-input__clear {
    font-size: 18px;
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
  onOpen?: (event: any) => void;
  /**
   * 弹窗消失时的回调函数
   */
  onClose?: (event: any) => void;
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
    onClose: onCloseProp,
    onOpen,
    open: openProp,
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

  const [open, setOpen] = useState(openProp ?? false);

  const inputComponent = SelectInput;

  const onClick = () => {
    if (disabled || readOnly) {
      return;
    }

    setOpen(true);
  };

  const onClose = useCallback(
    (event: any) => {
      setOpen(false);

      if (onCloseProp) {
        onCloseProp(event);
      }
    },
    [onCloseProp],
  );

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
    focused: open,
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
    onClick,
    ref,
    label,
    className: classNames('sinoui-select-base-layout', className),
    endAdornment: (
      <InputAdornment position="end">
        <ArrowDropDownIcon />
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
