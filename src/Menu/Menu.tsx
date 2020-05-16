/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-param-reassign */
import React, { useCallback, useRef, useEffect } from 'react';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import Popover, { PopoverProps } from '@sinoui/core/Popover';
import { PaperProps } from '@sinoui/core/Paper';
import MenuList, { MenuListProps } from './MenuList';

export interface MenuProps extends PopoverProps {
  children?: React.ReactNode;
  open: boolean;
  onEnter?: (element: HTMLElement) => void;
  onRequestClose?: () => void;
  MenuListProps?: MenuListProps;
  PaperProps?: PaperProps;
  preventAutoFocus?: boolean;
  id?: string;
  paperRef?: HTMLElement;
  minWidth?: number;
  dense?: boolean;
  color?: string;
  textStyle?: React.CSSProperties;
}

const LTR_ORIGIN: {
  vertical: 'top';
  horizontal: 'left';
} = {
  vertical: 'top',
  horizontal: 'left',
};

export function syncWidth(anchorElement: HTMLElement, target?: HTMLElement) {
  if (
    target &&
    anchorElement.clientHeight < target.clientHeight &&
    !target.style.width
  ) {
    const size = `${getScrollbarSize()}px`;
    target.style.paddingRight = size;
    target.style.width = `calc(100% + ${size})`;
  }
}

function getSelectedItems(items?: HTMLCollection) {
  const focusItem = [];
  if (items) {
    for (let i = 0; i < items.length; i += 1) {
      if ((items[i] as any).selected) {
        focusItem.push(items[i]);
      }
    }
  }
  return focusItem;
}

function Menu(props: MenuProps) {
  const {
    preventAutoFocus,
    open,
    onEnter,
    onRequestClose,
    children,
    MenuListProps: menuListProps,
    PaperProps: paperProps = {},
    paperRef,
    minWidth,
    dense,
    color,
    textStyle,
    ...other
  } = props;

  const menuListRef = useRef<any>(null);
  const PaperPropsStyle = {};

  const focus = useCallback(() => {
    if (menuListRef.current) {
      const focusedItems = getSelectedItems(menuListRef.current.children);
      if (focusedItems.length > 0) {
        if (focusedItems.length === 1) {
          (focusedItems[0] as any).focus();
        } else {
          focusedItems.forEach((item) => (item as any).focus());
        }

        return;
      }
    }

    if (!preventAutoFocus) {
      const menuList = menuListRef.current;
      if (menuList && menuList.firstChild) {
        (menuList.firstChild as HTMLElement).focus();
      }
    }
  }, [preventAutoFocus]);

  useEffect(() => {
    if (open) {
      focus();
    }
  }, [focus, open]);

  const handleEnter = useCallback(
    (element: HTMLElement) => {
      const menuList = menuListRef.current as HTMLElement;
      focus();

      syncWidth(element, menuList);

      if (onEnter) {
        onEnter(element);
      }
    },
    [focus, onEnter],
  );

  const handleListKeyDown = useCallback(
    (event, key) => {
      if (key === 'tab' || key === 'esc') {
        event.preventDefault();

        if (onRequestClose) {
          onRequestClose();
        }
      }
    },
    [onRequestClose],
  );

  return (
    <Popover
      open={open}
      onEnter={handleEnter}
      anchorOrigin={LTR_ORIGIN}
      transformOrigin={LTR_ORIGIN}
      PaperProps={{
        ...paperProps,
        style: {
          maxHeight: 'calc(100vh - 96px)',
          WebkitOverflowScrolling: 'touch',
          minWidth,
          ...PaperPropsStyle,
        },
        ref: paperRef,
      }}
      onRequestClose={onRequestClose}
      {...other}
    >
      <MenuList
        onKeyDown={handleListKeyDown}
        {...menuListProps}
        ref={menuListRef}
      >
        {children}
      </MenuList>
    </Popover>
  );
}

export default Menu;
