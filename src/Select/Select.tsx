import React, { useState, useCallback } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import TextInputField from '@sinoui/core/TextInput';
import { Theme } from '@sinoui/theme';
import SelectInput from './SelectInput';

const iconFocusedStyle = css`
  color: ${(props) => props.theme.palette.primary.main};
  transform: rotate(180deg);
  transition: transform 200ms;
`;

const StyledTextInput = styled(TextInputField)`
  .sinoui-base-input__layout > svg {
    font-size: 24px;
    ${(props: { focused?: boolean; theme: Theme }) =>
      props.focused && iconFocusedStyle};
    ${(props) => props.error && `color: ${props.theme.palette.error.main}`};
  }
`;

export interface Props {
  autoWidth?: boolean;
  children: React.ReactChild[];
  multiple?: boolean;
  displayEmpty?: boolean;
  input?: React.ReactElement;
  inputProps?: any;
  label?: string;
  labelWidth?: number;
  MenuProps?: { [name: string]: any };
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLElement>,
    value?: string | string[],
  ) => void;
  onOpen?: (event: any) => void;
  onClose?: (event: any) => void;
  open?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  renderValue?: (value: string | string[]) => void;
  value?: string | string[];
  variant?: 'standard' | 'outlined' | 'filled';
  minWidth?: number;
  error?: string;
  dense?: boolean;
  helperText?: string;
  className?: string;
  required?: boolean;
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
    labelWidth = 0,
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
    ...other
  } = props;

  const [open, setOpen] = useState(openProp ?? false);
  const [focused, setFocused] = useState(false);

  const inputComponent = SelectInput;

  const onClick = () => {
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
      variant,
      type: 'hidden',
      multiple,
      dense,
      disabled,
      ...{
        autoWidth,
        displayEmpty,
        MenuProps,
        onClose,
        onOpen,
        open,
        renderValue,
        onBlur,
        disabled,
      },
      ...inputProps,
      ...(input ? input.props.inputProps : {}),
    },
    onClick,
    ref,
    label,
    className: classNames('sinoui-select-base-layout', className),
    endComponent: <MdArrowDropDown />,
    labelWidth,
    value,
    disabled,
    error,
    variant,
    helperText,
    dense,
    ...other,
  });
});

export default Select;
