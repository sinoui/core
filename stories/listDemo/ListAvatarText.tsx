import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import ListItemText from '@sinoui/core/ListItemText';
import Divider from '@sinoui/core/Divider';
import Avatar from '@sinoui/core/Avatar';

const listData = [1, 2, 3, 4];
export default function Demo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <List>
        {listData.map((item) => (
          <>
            <ListItem>
              <ListItemPrimaryAction>
                <Avatar color="info">H</Avatar>
              </ListItemPrimaryAction>
              <ListItemText secondary="副标题辅助性文本副标题辅助性文本副标题副标题辅助性文本副标题副标题辅助性文本副标题辅助性文本副标题副标题辅助性文本副标题副标题辅助性文本副标题辅助性文本副标题副标题辅助性文本副标题副标题辅助性文本副标题辅助性文本副标题副标题辅助性文本副标题">
                item{item}
              </ListItemText>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </ThemeProvider>
  );
}
