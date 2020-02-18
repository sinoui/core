import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import OutlinedInput from '@sinoui/core/OutlineInput';
import Input from '@sinoui/core/Input';
import FilledInput from '@sinoui/core/FilledInput';
import { MdArrowDropDown } from 'react-icons/md';
import styled from 'styled-components';
import classNames from 'classnames';
import SelectInput from './SelectInput';
import './Select.css';
import { Label, HelperText } from '../TextInput';

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
}

const SelectWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 0px;
  padding: 0;
  margin: 0;
  border: 0px;
  position: relative;
`;

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
    labelWidth: labelWidthProp = 0,
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
  const [labelWidth, setLabelWidth] = useState(labelWidthProp);
  const labelRef = useRef<HTMLLabelElement | null>(null);

  const shrink = useMemo(() => {
    return focused || (Array.isArray(value) ? value.length > 0 : !!value);
  }, [focused, value]);

  const shrinkRef = useRef(shrink);

  useEffect(() => {
    if (labelWidthProp) {
      setLabelWidth(labelWidthProp);
      return;
    }
    if (labelRef && labelRef.current) {
      const { width } = labelRef.current.getBoundingClientRect();
      setLabelWidth(width / (shrinkRef.current ? 0.75 : 1));
    }
  }, [labelWidthProp, shrink]);

  const inputComponent = SelectInput;

  const InputComponent: any =
    input ||
    {
      standard: <Input />,
      outlined: <OutlinedInput />,
      filled: <FilledInput />,
    }[variant];

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

  return (
    <SelectWrapper className={classNames('sinoui-select-wrapper', className)}>
      {label && (
        <Label
          ref={labelRef}
          disabled={disabled}
          error={!!error}
          variant={variant}
          shrink={shrink}
          dense={dense}
          focused={focused}
        >
          {label}
        </Label>
      )}
      {React.cloneElement(InputComponent, {
        inputComponent,
        inputProps: {
          children,
          variant,
          type: 'hidden',
          multiple,
          dense,
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
        className: 'sinoui-select-base-layout',
        endComponent: <MdArrowDropDown />,
        labelWidth,
        value,
        disabled,
        error: !!error,
        ...other,
      })}
      {!!error && (
        <HelperText error variant={variant} dense={dense}>
          {error}
        </HelperText>
      )}
      {!error && helperText && (
        <HelperText disabeld={disabled} variant={variant} dense={dense}>
          {helperText}
        </HelperText>
      )}
    </SelectWrapper>
  );
});

export default Select;
