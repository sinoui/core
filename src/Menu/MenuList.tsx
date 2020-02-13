import React, { useState, useCallback, useRef, useEffect } from 'react';
import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import List, { ListProps } from './List';
import { ListItemProps } from './ListItem';

export interface MenuListProps extends ListProps {
  children: React.ReactNode;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLElement>,
    keyCode?: string,
  ) => void;
}

function getItems(items: HTMLCollection) {
  const itemsArr = [];
  for (let i = 0; i < items.length; i += 1) {
    itemsArr.push(items[i]);
  }

  return itemsArr;
}

export default React.forwardRef<HTMLUListElement, MenuListProps>(
  function MenuList(props, ref) {
    const [currentTabIndex, setCurrentTabIndex] = useState(-1);
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

    const { onBlur, children, ...other } = props;

    const listRef = useRef<HTMLUListElement>(ref as any);
    const blurTimer = useRef<any>(null);

    const getFocusItem = () => {
      const list = listRef.current;
      const currentFocus = activeElement(ownerDocument(list));

      if (list && contains(list, currentFocus)) {
        return currentFocus;
      }
      return null;
    };

    const getFocusItemIndex = useCallback(() => {
      const focusItem = getFocusItem();
      if (focusItem) {
        const items = getItems(listRef.current.children);
        return items.indexOf(focusItem);
      }
      return -1;
    }, []);

    const resetTabIndex = useCallback(
      (forceReset?: boolean) => {
        const focusIndex = getFocusItemIndex();
        if (!forceReset && focusIndex) {
          return;
        }

        if (focusIndex !== -1) {
          setCurrentTabIndex(focusIndex);
        } else if (selectedItemIndex !== -1) {
          setCurrentTabIndex(selectedItemIndex);
        } else {
          setCurrentTabIndex(0);
        }
      },
      [getFocusItemIndex, selectedItemIndex],
    );

    useEffect(() => {
      resetTabIndex(true);

      return () => clearTimeout(blurTimer.current);
    }, [resetTabIndex]);

    const handleList = useCallback(() => {
      if (listRef.current) {
        resetTabIndex();
      }
    }, [resetTabIndex]);

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        blurTimer.current = setTimeout(handleList, 30);

        if (onBlur) {
          onBlur(event);
        }
      },
      [handleList, onBlur],
    );

    const handleItemFocus = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        const list = listRef.current;
        if (list) {
          for (let i = 0; i < list.children.length; i += 1) {
            if (list.children[i] === event.currentTarget) {
              setCurrentTabIndex(i);
              break;
            }
          }
        }
      },
      [],
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        const key = keycode(event.nativeEvent);
        const focusItem = getFocusItem();

        if (!focusItem) {
          return;
        }

        if (key === 'down') {
          event.preventDefault();
          if (focusItem.nextElementSibling) {
            focusItem.nextElementSibling.focus();
          }
        } else if (key === 'up') {
          event.preventDefault();
          if (focusItem.previousElementSibling) {
            focusItem.previousElementSibling.focus();
          }
        }
      },
      [],
    );

    return (
      <List role="menu" ref={listRef} onBlur={handleBlur} {...other}>
        {React.Children.map(
          children as any,
          (child: React.ReactElement<ListItemProps>, index: number) => {
            if (!React.isValidElement(child)) {
              return null;
            }

            const childProps: {
              key?: React.Key;
              tabIndex?: number;
              onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
              onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
            } = {
              key: (child.props as any).key || index,
              tabIndex: index === currentTabIndex ? 0 : -1,
              onFocus: handleItemFocus,
              onKeyDown: handleKeyDown,
            };

            const element = React.cloneElement(child, childProps);

            if (child.props.selected) {
              setSelectedItemIndex(index);
            }

            return element;
          },
        )}
      </List>
    );
  },
);
