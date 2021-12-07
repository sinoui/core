/* eslint-disable no-param-reassign */
import React, { useCallback, useRef, useEffect } from 'react';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import Paper, { PaperProps } from '@sinoui/core/Paper';
import Popper from '@sinoui/core/Popper';
import Grow from '@sinoui/core/Grow';
import type { VirtualElement } from '@popperjs/core';
import { Modifier } from '@popperjs/core';
import styled from 'styled-components';
import contains from 'dom-helpers/contains';
import type { ContainerElement } from '../utils/getContainerElement';
import MenuList, { MenuListProps } from './MenuList';

export interface MenuProps {
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
  /**
   * 参考元素。弹出提示内容会基于参考内容进行定位
   */
  referenceElement: ContainerElement<HTMLElement | VirtualElement>;
  /**
   * 传给popper的插件。
   */
  modifiers?: Partial<Modifier<any, any>>[];
}

const MenuLayout = styled(Popper)`
  z-index: 2;
`;

const StylePaper = styled(Paper)`
  overflow-y: auto;
`;

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
    referenceElement,
    modifiers,
  } = props;

  const menuListRef = useRef<any>(null);

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

  const onMenuoutClick = useCallback(
    (event) => {
      const { target } = event;
      if (
        target !== menuListRef.current &&
        !contains(menuListRef.current, target)
      ) {
        if (onRequestClose) {
          onRequestClose();
        }
      }
    },
    [onRequestClose],
  );

  useEffect(() => {
    if (open) {
      focus();
    }
  }, [focus, open]);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', onMenuoutClick);
    }

    return () => document.removeEventListener('click', onMenuoutClick);
  }, [onMenuoutClick, open]);

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
    <MenuLayout
      open={open}
      referenceElement={referenceElement}
      placement="bottom-start"
      modifiers={modifiers}
      portal
    >
      <Grow in={open} onEnter={handleEnter}>
        <StylePaper elevation={8}>
          <MenuList
            onKeyDown={handleListKeyDown}
            {...menuListProps}
            ref={menuListRef}
          >
            {children}
          </MenuList>
        </StylePaper>
      </Grow>
    </MenuLayout>
  );
}

export default Menu;
