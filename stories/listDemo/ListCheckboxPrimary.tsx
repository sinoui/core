import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { produce } from 'immer';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import ListSeconddarAction from '@sinoui/core/ListItemSecondaryAction';
import Divider from '@sinoui/core/Divider';
import BookmarkBorder from '@sinoui/icons/BookmarkBorder';
import IconButton from '@sinoui/core/IconButton';

const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Demo() {
  const [selectItems, setSelectItems] = useState<number[]>([]);

  const onClickItem = (_e: React.MouseEvent, item: number) => {
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

  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: number,
  ) => {
    e.stopPropagation();
    const index = selectItems.indexOf(item);
    if (!e.target.checked && index !== -1) {
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
                <input
                  type="checkbox"
                  checked={selectItems.indexOf(item) !== -1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onCheckboxChange(e, item)
                  }
                />
              </ListItemPrimaryAction>
              <ListItemText>item{item}</ListItemText>
              <ListSeconddarAction>
                <BookmarkBorder color="error" />
              </ListSeconddarAction>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </ThemeProvider>
  );
}
