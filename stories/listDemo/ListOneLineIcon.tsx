import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemSecondaryAction from '@sinoui/core/ListItemSecondaryAction';
import Divider from '@sinoui/core/Divider';
import BookmarkBorder from '@sinoui/icons/BookmarkBorder';
import CheckBox from '@sinoui/icons/CheckBox';

const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Demo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <List>
        {listData.map((item) => (
          <>
            <ListItem>
              <ListItemPrimaryAction>
                <BookmarkBorder color="primary" />
              </ListItemPrimaryAction>
              <ListItemText>item{item}</ListItemText>
              <ListItemSecondaryAction>
                <CheckBox color="error" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </ThemeProvider>
  );
}
