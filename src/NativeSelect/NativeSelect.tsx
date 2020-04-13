import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import TextInput from '@sinoui/core/TextInput';
import InputAdornment from '@sinoui/core/InputAdornment';
import NativeSelectInput from './NativeSelectInput';
import ArrowDropDownIcon from './ArrowDropDownIcon';

const NativeSelect = React.forwardRef<HTMLElement, any>(function Select(
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

  const inputComponent = NativeSelectInput;

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

  return React.cloneElement(<TextInput />, {
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

export default NativeSelect;
