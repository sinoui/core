import React, { useState, useCallback, useRef, useEffect } from 'react';
import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import List, { ListProps } from './List';
import { ListItemProps } from './ListItem';
import useMultiRefs from '../utils/useMultiRefs';

export interface MenuListProps extends ListProps {
  children: React.ReactNode;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onKeyDown?: (
    event: React.FocusEvent<HTMLElement> | any,
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

    const selectedItemIndexRef = useRef<number>(-1);

    const { onBlur, children, onKeyDown, ...other } = props;

    const listRef = useRef<HTMLUListElement>(null);
    const handleListRef = useMultiRefs(listRef, ref);
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
        const listItemDOMS = listRef.current?.children;
        const items = listItemDOMS ? getItems(listItemDOMS) : [];
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
        } else if (selectedItemIndexRef.current !== -1) {
          setCurrentTabIndex(selectedItemIndexRef.current);
        } else {
          setCurrentTabIndex(0);
        }
      },
      [getFocusItemIndex],
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
        } else if (key === 'enter') {
          event.preventDefault();
          if (onKeyDown) {
            onKeyDown(
              {
                ...event,
                target: {
                  ...event.target,
                  value: focusItem.getAttribute('value'),
                },
              },
              key,
            );
          }
        } else if (onKeyDown) {
          onKeyDown(event, key);
        }
      },
      [onKeyDown],
    );

    return (
      <List role="menu" ref={handleListRef} onBlur={handleBlur} {...other}>
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
              selectedItemIndexRef.current = index;
            }

            return element;
          },
        )}
      </List>
    );
  },
);
