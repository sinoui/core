import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import Divider from '@sinoui/core/Divider';

const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Demo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <List paddingLeft={72}>
        {listData.map((item) => (
          <>
            <ListItem paddingLeft={item % 2 === 0 ? 32 : 72}>
              <ListItemText>item{item}</ListItemText>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </ThemeProvider>
  );
}
