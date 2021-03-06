import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { produce } from 'immer';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import Divider from '@sinoui/core/Divider';
import BookmarkBorder from '@sinoui/icons/BookmarkBorder';
import Favorite from '@sinoui/icons/Favorite';
import KeyboardArrowUp from '@sinoui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@sinoui/icons/KeyboardArrowDown';
import IconButton from '@sinoui/core/IconButton';
import ListItemSecondaryAction from '@sinoui/core/ListItemSecondaryAction';

const listData = [1, 2, 3, 4, 5, 6];
const subListData = [1, 2];
export default function Demo() {
  const [expandItems, setExpandItems] = useState<number[]>([]);

  const onClickItem = (e: React.MouseEvent, item: number) => {
    e.stopPropagation();
    const index = expandItems.indexOf(item);
    if (index !== -1) {
      const newValue = produce(expandItems, (draft) => {
        draft.splice(index, 1);
      });
      setExpandItems(newValue);
    } else {
      const newValue = produce(expandItems, (draft) => {
        draft.push(item);
      });
      setExpandItems(newValue);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <List>
        {listData.map((item) => (
          <>
            <ListItem disabledRipple key={item}>
              <ListItemPrimaryAction>
                <BookmarkBorder color="primary" />
              </ListItemPrimaryAction>
              <ListItemText>item{item}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  onClick={(e: React.MouseEvent) => onClickItem(e, item)}
                >
                  {expandItems.indexOf(item) !== -1 ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  )}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <List
              disabledPadding
              style={{
                display: expandItems.indexOf(item) !== -1 ? 'block' : 'none',
              }}
            >
              {subListData.map((subItem: number, index: number) => (
                <>
                  <ListItem insert key={subItem}>
                    <ListItemPrimaryAction>
                      <Favorite color="error" />
                    </ListItemPrimaryAction>
                    <ListItemText>subItem{subItem}</ListItemText>
                  </ListItem>
                  {index === subListData.length - 1 && <Divider />}
                </>
              ))}
            </List>
          </>
        ))}
      </List>
    </ThemeProvider>
  );
}
