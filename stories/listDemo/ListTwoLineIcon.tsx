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

const listData = [1, 2, 3, 4];
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
              <ListItemText secondary="副标题辅助性文本副标题辅助性文本副标题副标题辅助性文本">
                item{item}
              </ListItemText>
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
