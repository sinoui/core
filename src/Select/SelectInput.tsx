/* eslint-disable react/no-danger */
import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import Menu, { MenuListItem } from '@sinoui/core/Menu';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import useForkRef from '../utils/useForkRef';

export interface Props {
  autoFocus?: boolean;
  autoWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  defaultValue?: string | string[];
  disabled?: boolean;
  IconComponent: React.ReactType;
  inputRef: any;
  labelId?: string;
  MenuProps?: any;
  multiple?: boolean;
  displayEmpty?: boolean;
  name?: string;
  onBlur?: (event?: React.FocusEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLElement>,
    value?: string | string[],
  ) => void;
  onOpen?: (event: any) => void;
  onClose?: (event: any) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: string | string[]) => void;
  tabIndex?: number;
  value: string | string[];
  variant?: 'standard' | 'outlined' | 'filled';
  minWidth?: number;
}

type SelectLayoutProps = Omit<Props, 'IconComponent' | 'value' | 'inputRef'>;

function areEqualValues(a: any, b: any) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}

function isEmpty(display: any) {
  return display == null || (typeof display === 'string' && !display.trim());
}

const filledStyle = css`
  padding: 27px 0px 10px 12px;
`;

const outlinedStyle = css`
  padding: 18.5px 0px 18.5px 14px;
`;

const disabledStyle = css`
  cursor: default;
`;

const selectStyle = css<SelectLayoutProps>`
  min-width: ${(props) => props.minWidth || 160}px;
  user-select: none;
  padding: 6px 0 7px;
  height: 1.1875rem;
  width: 100%;
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
  border: 0px;
  box-sizing: content-box;
  background: transparent;
  font-size: ${(props) => props.theme.typography.subheading.fontSize}rem;
  font-family: ${(props) => props.theme.typography.fontFamily};
  border-radius: 0;
  outline: none;

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  &::-ms-expand {
    display: none;
  }
`;

const menuSelectStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SelectLayout = styled.div<SelectLayoutProps>`
  ${selectStyle};
  ${menuSelectStyle};
  ${(props) => props.disabled && disabledStyle};
  ${(props) => props.variant === 'filled' && filledStyle};
  ${(props) => props.variant === 'outlined' && outlinedStyle}
`;

export default React.forwardRef<HTMLSelectElement, Props>(function SelectInput(
  props,
  ref,
) {
  const {
    autoFocus,
    autoWidth,
    children,
    className,
    defaultValue,
    disabled,
    displayEmpty,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open,
    readOnly,
    renderValue,
    tabIndex: tabIndexProp,
    value: valueProp,
    variant,
    ...other
  } = props;

  const [value, setValue] = useState(defaultValue ?? valueProp);

  const inputRef = useRef(null);
  const handleRef = useForkRef(ref, inputRefProp);
  const anchorElRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        if (anchorElRef.current) {
          anchorElRef.current.focus();
        }
      },

      node: inputRef.current,
      value,
    }),
    [value],
  );

  useEffect(() => {
    if (autoFocus && anchorElRef.current) {
      anchorElRef.current.focus();
    }
  }, [autoFocus]);

  const update = (openState: boolean | undefined, event: any) => {
    if (openState) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);

      if (anchorElRef.current) {
        anchorElRef.current.focus();
      }
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    if (anchorElRef.current) {
      anchorElRef.current.focus();
    }

    update(true, event);
  };

  const handleClose = (event: any) => {
    update(false, event);
  };

  const handleItemClick = (child: any) => (event: any) => {
    if (!multiple) {
      update(false, event);
    }

    let newValue;

    if (multiple) {
      newValue = Array.isArray(value) ? [...value] : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }

    setValue(newValue);

    if (onChange) {
      event.persist();
      // Preact support, target is read only property on a native event.
      Object.defineProperty(event, 'target', {
        writable: true,
        value: { value: newValue, name },
      });
      onChange(event, child);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!readOnly) {
      const validKeys = [' ', 'ArrowUp', 'ArrowDown', 'Enter'];

      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        update(true, event);
      }
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!open && onBlur) {
      event.persist();
      Object.defineProperty(event, 'target', {
        writable: true,
        value: { value, name },
      });
      onBlur(event);
    }
  };

  let display: any;
  let displaySingle;
  const displayMultiple: string[] = [];
  let computeDisplay = false;

  if (
    (value !== null &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0)) ||
    displayEmpty
  ) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    let selected;

    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(
          'Material-UI: the `value` prop must be an array ' +
            'when using the `Select` component with `multiple`.',
        );
      }

      selected = value.some((v) => areEqualValues(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }

    return (
      <MenuListItem
        role="option"
        {...child.props}
        key={child.props.key || index}
        selected={selected}
        onClick={handleItemClick(child)}
      />
    );
  });

  if (computeDisplay) {
    display = multiple ? displayMultiple.join(', ') : displaySingle;
  }

  let menuMinWidth;

  if (!autoWidth && anchorElRef.current && anchorElRef.current.parentNode) {
    menuMinWidth = (anchorElRef.current.parentNode as any).clientWidth;
  }

  let tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }

  return (
    <>
      <SelectLayout
        className={classNames('sinoui-select-layout', className)}
        ref={anchorElRef}
        data-mui-test="SelectDisplay"
        tabIndex={tabIndex as any}
        role="button"
        variant={variant}
        aria-expanded={open ? 'true' : undefined}
        aria-labelledby={`${labelId || ''}`}
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
        onMouseDown={(disabled || readOnly ? null : handleMouseDown) as any}
        onBlur={handleBlur as any}
        onFocus={onFocus}
      >
        {isEmpty(display) ? <span>&#8203;</span> : display}
      </SelectLayout>
      <input
        name={name}
        ref={inputRef}
        type="hidden"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        {...other}
      />
      <Menu
        id={`menu-${name || ''}`}
        minWidth={
          anchorElRef.current?.parentNode
            ? (anchorElRef.current.parentNode as any).clientWidth
            : 0
        }
        anchorEl={anchorElRef.current}
        open={open}
        onRequestClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        {...MenuProps}
        MenuListProps={{
          'aria-labelledby': labelId,
          role: 'listbox',
          disableListWrap: true,
          ...MenuProps.MenuListProps,
        }}
        PaperProps={{
          ...MenuProps.PaperProps,
          style: {
            minWidth: menuMinWidth,
            ...(MenuProps.PaperProps != null
              ? MenuProps.PaperProps.style
              : null),
            margin: 0,
          },
        }}
      >
        {items}
      </Menu>
    </>
  );
});
