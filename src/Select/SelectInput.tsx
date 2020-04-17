/* eslint-disable react/no-danger */
import React, { useRef, useEffect, useCallback } from 'react';
import Menu, { MenuListItem } from '@sinoui/core/Menu';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import useMultiRefs from '../utils/useMultiRefs';

export interface Props {
  /**
   * 是否自动获取焦点
   */
  autoFocus?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 不可用
   */
  disabled?: boolean;
  /**
   * Menu属性
   */
  MenuProps?: any;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 失去焦点时的回调函数
   */
  onBlur?: () => void;
  /**
   * 获取焦点时的回调函数
   */
  onFocus?: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value?: string | string[]) => void;
  /**
   * 弹窗出现时的回调函数
   */
  onOpen?: () => void;
  /**
   * 弹窗关闭时的回调函数
   */
  onClose?: () => void;
  /**
   * 是否显示弹窗
   */
  open?: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 渲染值的处理逻辑
   */
  renderValue?: (value?: string | string[]) => React.ReactNode;
  tabIndex?: number;
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 最小宽度
   */
  minWidth?: number;
  /**
   * 弹窗是否打开
   */
  $isOpen?: boolean;
}

type SelectLayoutProps = Omit<Props, 'value' | 'inputRef'>;

/**
 * 判断是否为空
 *
 * @param {*} display 判断的值
 * @returns boolean
 */
function isEmpty(display: any) {
  return display == null || (typeof display === 'string' && !display.trim());
}

const disabledStyle = css`
  cursor: default;
`;

const selectStyle = css<SelectLayoutProps>`
  && {
    min-width: ${(props) => props.minWidth || 0}px;
  }

  user-select: none;
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
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
`;

/**
 * 处理复选框内部逻辑的组件
 */
export default React.forwardRef<HTMLDivElement, Props>(function SelectInput(
  props,
  ref,
) {
  const {
    autoFocus,
    children,
    className,
    disabled,
    MenuProps = {},
    multiple,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open,
    readOnly,
    renderValue,
    tabIndex = 0,
    value,
    minWidth,
    ...other
  } = props;

  const anchorElRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useMultiRefs(ref, anchorElRef);

  useEffect(() => {
    if (autoFocus && anchorElRef.current) {
      anchorElRef.current.focus();
    }
  }, [autoFocus]);

  const handleFocus = useCallback(() => {
    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  const handleOpen = useCallback(() => {
    if (disabled || readOnly) {
      return;
    }

    if (onOpen) {
      onOpen();
    }
  }, [disabled, onOpen, readOnly]);

  const handleClose = useCallback(() => {
    if (anchorElRef.current) {
      anchorElRef.current.focus();
    }

    if (onClose) {
      onClose();
    }
  }, [onClose]);

  /**
   * 点击选项时的回调函数
   */
  const handleItemClick = (child: any) => () => {
    if (!multiple) {
      handleClose();
    }

    let newValue;

    if (multiple) {
      newValue = Array.isArray(value) ? [...value] : [];
      const itemIndex = newValue.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!readOnly) {
      const validKeys = [' ', 'ArrowUp', 'ArrowDown', 'Enter'];

      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        handleOpen();
      }
    }
  };

  const handleBlur = () => {
    if (open) {
      return;
    }

    if (onBlur) {
      onBlur();
    }
  };

  let display: any;
  let displaySingle;
  const displayMultiple: string[] = [];
  let computeDisplay = false;

  if (renderValue) {
    display = renderValue(value);
  } else {
    computeDisplay = true;
  }

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    let selected;

    if (multiple) {
      selected =
        Array.isArray(value) && value.some((v) => v === child.props.value);
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = value === child.props.value;
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }

    return (
      <MenuListItem
        role="option"
        {...child.props}
        $key={child.props.key || index}
        selected={selected}
        onClick={handleItemClick(child)}
      />
    );
  });

  if (computeDisplay) {
    display = multiple ? displayMultiple.join(', ') : displaySingle;
  }

  let menuMinWidth;

  if (anchorElRef.current && anchorElRef.current.parentNode) {
    menuMinWidth = (anchorElRef.current.parentNode as any).clientWidth;
  }

  return (
    <>
      <SelectLayout
        className={classNames('sinoui-select-layout', className)}
        ref={handleRef}
        data-testid="SelectDisplay"
        tabIndex={disabled ? undefined : tabIndex}
        role="button"
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="listbox"
        aria-disabled={disabled ? 'true' : 'false'}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled || readOnly}
        minWidth={minWidth}
        $isOpen={open}
        {...other}
      >
        {isEmpty(display) ? <span>&#8203;</span> : display}
      </SelectLayout>
      <Menu
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
