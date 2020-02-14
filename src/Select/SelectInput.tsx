/* eslint-disable react/no-danger */
import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import Menu from '@sinoui/core/Menu';
import classNames from 'classnames';
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
}

function areEqualValues(a: any, b: any) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}

function isEmpty(display: any) {
  return display == null || (typeof display === 'string' && !display.trim());
}

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
    ...other
  } = props;

  const [value, setValue] = useState(defaultValue ?? valueProp);

  const inputRef = useRef(null);
  const [displayNode, setDisplayNode] = useState<any>(null);
  const handleRef = useForkRef(ref, inputRefProp);

  useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        if (displayNode) {
          displayNode.focus();
        }
      },
      node: inputRef.current,
      value,
    }),
    [displayNode, value],
  );

  useEffect(() => {
    if (autoFocus && displayNode) {
      displayNode.focus();
    }
  }, [autoFocus, displayNode]);

  const update = (openState: boolean | undefined, event: any) => {
    if (openState) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    displayNode.focus();

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

  if (displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }

  const items = React.Children.map(children, (child) => {
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

    return React.cloneElement(child, {
      'aria-selected': selected ? 'true' : undefined,
      onClick: handleItemClick(child),
      onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === ' ') {
          event.preventDefault();
        }
        const { onKeyUp } = child.props;
        if (typeof onKeyUp === 'function') {
          onKeyUp(event);
        }
      },
      role: 'option',
      selected,
      value: undefined,
      'data-value': child.props.value,
    });
  });

  if (computeDisplay) {
    display = multiple ? displayMultiple.join(', ') : displaySingle;
  }

  let menuMinWidth;

  if (!autoWidth && displayNode) {
    menuMinWidth = displayNode.clientWidth;
  }

  let tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }

  return (
    <>
      <div
        className={classNames('sinoui-select-layout', className)}
        ref={setDisplayNode}
        data-mui-test="SelectDisplay"
        tabIndex={tabIndex as any}
        role="button"
        aria-expanded={open ? 'true' : undefined}
        aria-labelledby={`${labelId || ''}`}
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
        onMouseDown={(disabled || readOnly ? null : handleMouseDown) as any}
        onBlur={handleBlur}
        onFocus={onFocus}
      >
        {isEmpty(display) ? (
          <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
        ) : (
          display
        )}
      </div>
      <input
        value={Array.isArray(value) ? value.join(',') : value}
        name={name}
        ref={inputRef}
        type="hidden"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        {...other}
      />
      <IconComponent />
      <Menu
        id={`menu-${name || ''}`}
        anchorEl={displayNode}
        open={open}
        onRequestClose={handleClose}
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
          },
        }}
      >
        {items}
      </Menu>
    </>
  );
});
