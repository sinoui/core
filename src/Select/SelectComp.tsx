/* eslint-disable no-param-reassign */
import React, { useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import keycode from 'keycode';
import Menu, { MenuListItem } from '@sinoui/core/Menu';
import { OptionProps } from './Option';

export interface SelectProps {
  children?: React.ReactNode;
  disabled?: boolean;
  value?: string | string[];
  readOnly?: boolean;
  selectProps?: {
    // tslint:disable-next-line:no-any
    [x: string]: any;
  };
  onBlur?: (event?: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLElement>,
    value?: string | number | string[],
  ) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectRef?: (node: Element) => void;
  error?: boolean;
  native?: boolean;
  open?: boolean;
  multiple?: boolean;
  name?: string;
  autoWidth?: boolean;
  displayEmpty?: boolean;
  MenuProps?: {
    // tslint:disable-next-line:no-any
    [x: string]: any;
  };
  renderValue?: (value: string | number | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
  /**
   * dom元素的id
   */
  id?: string;
  minWidth?: number;
  dense?: boolean;
  borderless?: boolean;
  syncIconColor?: boolean;
  color?: string;
  textStyle?: React.CSSProperties;
  /**
   * 在没有选项时显示的内容
   *
   */
  // tslint:disable-next-line:no-any
  content?: any;
  // tslint:disable-next-line:no-any
  icon?: React.ReactElement<any>;
  /**
   * 是否隐藏图标
   *
   */
  iconHidden?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const disabledStyle = css`
  cursor: default;
`;

const selectStyle = css<SelectProps>`
  min-width: ${(props) => props.minWidth || 120}px;
  -webkit-appearance: none;
  user-select: none;
  padding: ${(props) => (props.borderless ? '2px 0 3px' : '6px 0 7px')};
  height: 19px;
  padding-right: ${(props) =>
    props.readOnly ? 0 : props.theme.spacing.unit * (props.dense ? 3 : 4)}px;
  width: calc(100% - ${(props) => props.theme.spacing.unit * 4}px);
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
  width: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 19px;
`;

const StyleSelect = styled.select`
  ${selectStyle};
  ${(props) => props.disabled && disabledStyle};
`;

const StyleMenuSelect = styled.div<SelectProps>`
  ${selectStyle};
  ${menuSelectStyle};
  ${(props) => props.disabled && disabledStyle};
`;

function SelectComp(props: SelectProps) {
  const menuPaperRef = useRef<HTMLElement>(null);
  const anchorElRef = useRef<HTMLDivElement | null>(null);
  const ignoreNextBlur = useRef(false);
  const ignoreNextFocus = useRef(false);

  const {
    onOpen,
    onClose,
    onBlur,
    readOnly,
    multiple,
    onChange,
    onFocus,
    children,
    disabled,
    displayEmpty,
    MenuProps = {},
    name,
    native,
    renderValue,
    value,
    style,
    className,
    minWidth,
    open,
    dense,
    borderless,
    textStyle,
    color,
    content,
  } = props;

  const syncMenuWidth = () => {
    requestAnimationFrame(() => {
      const anchorElement = anchorElRef.current;
      const targetElement = menuPaperRef.current;
      if (anchorElement && targetElement) {
        targetElement.style.minWidth = `${anchorElement.clientWidth}px`;
      }
    });
  };

  useEffect(() => {
    syncMenuWidth();
  }, []);

  const handleElement = useCallback(
    ({
      openState,
      anchorEl,
    }: {
      openState: boolean;
      anchorEl: HTMLDivElement | HTMLElement;
    }) => {
      anchorElRef.current = anchorEl as HTMLDivElement;
      if (openState && onOpen) {
        onOpen();
      } else if (!openState && onClose) {
        onClose();
      }
    },
    [onClose, onOpen],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.persist();
      ignoreNextBlur.current = true;
      handleElement({
        openState: true,
        anchorEl: event.currentTarget,
      });
    },
    [handleElement],
  );

  const focusSelect = () => {
    ignoreNextFocus.current = true;
    if (anchorElRef.current) {
      anchorElRef.current.focus();
    }
  };

  const handleClose = useCallback(() => {
    if (onBlur) {
      onBlur();
    }
    focusSelect();
    handleElement({
      openState: false,
      anchorEl: anchorElRef.current as HTMLElement,
    });
  }, [handleElement, onBlur]);

  const handleItemClick = useCallback(
    (child: any) => (event: React.MouseEvent<HTMLElement>) => {
      if (readOnly) {
        return;
      }

      if (!multiple) {
        focusSelect();
        handleElement({
          openState: false,
          anchorEl: anchorElRef.current as HTMLElement,
        });
      }

      if (onChange) {
        let currentValue;
        let target;

        if (event.target) {
          target = event.target;
        }

        /**
         * 添加disabled属性
         */
        if (child.props.disabled) {
          return;
        }

        if (multiple) {
          currentValue = value ?? [];

          const itemIndex = currentValue
            ? currentValue.indexOf(child.props.value)
            : -1;
          if (itemIndex === -1) {
            (currentValue as string[]).push(child.props.value);
          } else {
            (currentValue as string[]).splice(itemIndex, 1);
          }
        } else {
          currentValue = child.props.value;
        }

        event.persist();
        event.target = { ...target, value: currentValue, name } as any;

        onChange(event, currentValue);

        syncMenuWidth();
      }
    },
    [handleElement, multiple, name, onChange, value, readOnly],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (readOnly) {
        return;
      }

      if (
        (['space', 'up', 'down'] as any).includes(keycode(event.nativeEvent))
      ) {
        event.preventDefault();
        ignoreNextBlur.current = true;
        handleElement({
          openState: true,
          anchorEl: event.currentTarget,
        });
      }
    },
    [handleElement, readOnly],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLSelectElement>) => {
      if (readOnly) {
        return;
      }

      if (ignoreNextBlur.current === true) {
        // The parent components are relying on the bubbling of the event.
        event.stopPropagation();
        ignoreNextBlur.current = false;
        return;
      }

      if (onBlur) {
        event.target.value = value as string;
        onBlur(event);
      }
    },
    [onBlur, value, readOnly],
  );

  const handleOnFocus = useCallback(
    (event) => {
      if (readOnly) {
        return;
      }

      if (ignoreNextFocus.current === true) {
        // The parent components are relying on the bubbling of the event.
        event.stopPropagation();
        ignoreNextFocus.current = false;
        return;
      }

      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus, readOnly],
  );

  if (native) {
    return <StyleSelect {...props} />;
  }

  let display;
  let displaySingle = '';
  const displayMultiple: any[] = [];
  let computeDisplay = false;

  // No need to display any value if the field is empty.
  if (
    (value !== null &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0)) ||
    displayEmpty
  ) {
    if (renderValue) {
      display = renderValue(value as any);
    } else {
      computeDisplay = true;
    }
  }

  const items = React.Children.map(
    children as any,
    (child: React.ReactElement<OptionProps>, index: number) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      let selected;

      if (multiple) {
        const valueArray: string[] = (value as string[]) ?? [];

        selected = valueArray
          ? valueArray.findIndex((item) => item === child.props.value) !== -1
          : false;
        if (selected && computeDisplay) {
          displayMultiple.push(child.props.title || child.props.children);
        }
      } else {
        selected = value === child.props.value;
        if (selected && computeDisplay) {
          displaySingle = (child.props.title || child.props.children) as string;
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
    },
  );

  if (computeDisplay) {
    display = multiple ? displayMultiple.join(', ') : displaySingle;
  }

  return (
    <>
      <div>
        <StyleMenuSelect
          className={classNames('sinoui-select-content', className)}
          dense={dense}
          aria-pressed={open ? 'true' : 'false'}
          tabIndex={disabled ? undefined : 0}
          role="button"
          aria-owns={open ? `menu-${name || ''}` : undefined}
          aria-haspopup="true"
          onBlur={handleBlur as any}
          onFocus={handleOnFocus}
          disabled={disabled}
          multiple={multiple}
          readOnly={readOnly}
          minWidth={minWidth}
          style={{ ...style, ...textStyle }}
          ref={anchorElRef}
          onClick={(disabled || readOnly ? null : handleClick) as any}
          onKeyDown={handleKeyDown}
          borderless={borderless}
        >
          {display || content}
        </StyleMenuSelect>
      </div>
      <Menu
        dense={dense}
        minWidth={anchorElRef.current ? anchorElRef.current.clientWidth : 0}
        paperRef={menuPaperRef as any}
        key="select-menu"
        id={`menu-${name || ''}`}
        anchorEl={anchorElRef.current}
        open={open}
        onRequestClose={handleClose}
        {...MenuProps}
        MenuListProps={{
          ...MenuProps.MenuListProps,
          role: 'listbox',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        color={color}
        textStyle={textStyle}
      >
        {items}
      </Menu>
    </>
  );
}

export default SelectComp;

export { StyleMenuSelect };
