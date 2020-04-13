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
import IconButton from '@sinoui/core/IconButton';

const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Demo() {
  const [selectItems, setSelectItems] = useState<number[]>([]);

  const onClickItem = (e: React.MouseEvent, item: number) => {
    e.stopPropagation();
    const index = selectItems.indexOf(item);
    if (index !== -1) {
      const newValue = produce(selectItems, (draft) => {
        draft.splice(index, 1);
      });
      setSelectItems(newValue);
    } else {
      const newValue = produce(selectItems, (draft) => {
        draft.push(item);
      });
      setSelectItems(newValue);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <List>
        {listData.map((item) => (
          <>
            <ListItem
              onClick={(e: React.MouseEvent) => onClickItem(e, item)}
              selected={selectItems.indexOf(item) !== -1}
              key={item}
            >
              <ListItemPrimaryAction>
                <IconButton color="primary">
                  <BookmarkBorder />
                </IconButton>
              </ListItemPrimaryAction>
              <ListItemText>item{item}</ListItemText>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </ThemeProvider>
  );
}
