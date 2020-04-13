import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { produce } from 'immer';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemSecondaryAction from '@sinoui/core/ListItemSecondaryAction';
import Divider from '@sinoui/core/Divider';

const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Demo() {
  const [selectItems, setSelectItems] = useState<number[]>([]);

  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: number,
  ) => {
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
    e.stopPropagation();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <List>
        {listData.map((item) => (
          <>
            <ListItem key={item} disabledRipple>
              <ListItemText>item{item}</ListItemText>
              <ListItemSecondaryAction>
                <input
                  type="checkbox"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onCheckboxChange(e, item)
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </ThemeProvider>
  );
}
