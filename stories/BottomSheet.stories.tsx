import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import BottomSheet from '@sinoui/core/BottomSheet';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import Divider from '@sinoui/core/Divider';
import IconButton from '@sinoui/core/IconButton';
import BookmarkBorder from '@sinoui/icons/BookmarkBorder';

export default {
  title: 'BottomSheet',
};

const listData = [1, 2, 3];
const content = (
  <List>
    {listData.map((item) => (
      <React.Fragment key={item}>
        <ListItem>
          <ListItemPrimaryAction>
            <IconButton color="primary">
              <BookmarkBorder />
            </IconButton>
          </ListItemPrimaryAction>
          <ListItemText>item{item}</ListItemText>
        </ListItem>
        <Divider />
      </React.Fragment>
    ))}
  </List>
);

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheet>{content}</BottomSheet>
  </ThemeProvider>
);

function BottomSheetDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onBackdropClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheet open={open} onBackdropClick={onBackdropClick}>
        {content}
      </BottomSheet>
    </>
  );
}

export const 点击遮罩层事件 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheetDemo />
  </ThemeProvider>
);

export const 设置不显示遮罩层 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheet backdrop={false}>{content}</BottomSheet>
  </ThemeProvider>
);
