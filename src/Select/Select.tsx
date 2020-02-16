import React, { useState, useCallback } from 'react';
import OutlinedInput from '@sinoui/core/OutlineInput';
import Input from '@sinoui/core/Input';
import FilledInput from '@sinoui/core/FilledInput';
import { MdArrowDropDown } from 'react-icons/md';
import SelectInput from './SelectInput';

export interface Props {
  autoWidth?: boolean;
  children: React.ReactChild;
  defaultValue?: string | string[];
  multiple?: boolean;
  displayEmpty?: boolean;
  IconComponent?: React.ReactType;
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
}

const Select = React.forwardRef<HTMLElement, Props>(function Select(
  props,
  ref,
) {
  const {
    autoWidth = false,
    children,
    displayEmpty = false,
    IconComponent = MdArrowDropDown,
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
    ...other
  } = props;

  const [open, setOpen] = useState(openProp ?? false);

  const inputComponent = SelectInput;

  const InputComponent: any =
    input ||
    {
      standard: <Input />,
      outlined: <OutlinedInput label={label} labelWidth={labelWidth} />,
      filled: <FilledInput />,
    }[variant];

  const onClick = () => {
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

  return React.cloneElement(InputComponent, {
    inputComponent,
    inputProps: {
      children,
      IconComponent,
      variant,
      type: undefined,
      multiple,
      ...{
        autoWidth,
        displayEmpty,
        MenuProps,
        onClose,
        onOpen,
        open,
        renderValue,
      },
      ...inputProps,
      ...(input ? input.props.inputProps : {}),
    },
    onClick,
    ref,
    ...other,
  });
});

export default Select;
