import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import { Theme } from '@sinoui/theme';
import InputAdornment from '@sinoui/core/InputAdornment';
import SelectInput from './SelectInput';
import ArrowDropDownIcon from './ArrowDropDownIcon';

const iconFocusedStyle = css`
  color: ${(props) => props.theme.palette.primary.main};
  transform: rotate(180deg);
  transition: transform 200ms;
`;

const StyledTextInput = styled(TextInput)`
  > .sinoui-base-input {
    cursor: ${({ disabled, readOnly }) =>
      disabled || readOnly ? 'default' : 'pointer'};
  }

  > .sinoui-base-input > .sinoui-input-adornment--end > svg {
    font-size: 24px;
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

export interface Props {
  /**
   * 宽度自适应
   */
  autoWidth?: boolean;
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 多选
   */
  multiple?: boolean;
  displayEmpty?: boolean;
  /**
   * 可输入区域元素
   */
  input?: React.ReactElement;
  /**
   * 可输入组件的相关属性
   */
  inputProps?: object;
  /**
   * 标签内容
   */
  label?: string;
  /**
   * 弹出Menu的属性
   */
  MenuProps?: { [name: string]: any };
  /**
   * 值变更时的回调函数
   */
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLElement>,
    value?: string | string[],
  ) => void;
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
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 值的渲染方式
   */
  renderValue?: (value: string | string[]) => void;
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 下拉框类型
   */
  variant?: 'standard' | 'outlined' | 'filled';
  /**
   * 最小宽度
   */
  minWidth?: number;
  /**
   * 错误信息
   */
  error?: string;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 辅助性文本
   */
  helperText?: string;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 是否允许清空
   */
  allowClear?: boolean;
}

const Select = React.forwardRef<HTMLElement, Props>(function Select(
  props,
  ref,
) {
  const {
    autoWidth = false,
    children,
    displayEmpty = false,
    input,
    inputProps,
    label,
    MenuProps,
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
    ...other
  } = props;

  const [open, setOpen] = useState(openProp ?? false);
  const [focused, setFocused] = useState(false);

  const inputComponent = SelectInput;

  const onClick = () => {
    if (disabled || readOnly) {
      return;
    }

    setOpen(true);
    setFocused(true);
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

  const onBlur = (_event: React.FocusEvent<HTMLDivElement>) => {
    setFocused(false);
  };

  return React.cloneElement(<StyledTextInput />, {
    inputComponent,
    focused,
    inputProps: {
      children,
      multiple,
      ...{
        autoWidth,
        displayEmpty,
        MenuProps,
        onClose,
        onOpen,
        open,
        renderValue,
        onBlur,
      },
      ...inputProps,
      ...(input ? input.props.inputProps : {}),
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
    helperText,
    dense,
    type: 'hidden',
    ...other,
  });
});

export default Select;
