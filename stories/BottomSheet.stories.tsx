import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import BottomSheet from '@sinoui/core/BottomSheet';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import SvgIcon from '@sinoui/core/SvgIcon';
import { MdShare, MdInsertLink, MdModeEdit, MdDelete } from 'react-icons/md';

export default {
  title: 'BottomSheet',
};

const listData = [
  { icon: MdShare, text: 'Share' },
  { icon: MdInsertLink, text: 'Get link' },
  { icon: MdShare, text: 'Share' },
];

const listScrollData = [
  ...listData,
  ...[
    { icon: MdModeEdit, text: 'Edit name' },
    { icon: MdDelete, text: 'Delete collection' },
    { icon: MdShare, text: 'Share' },
    { icon: MdInsertLink, text: 'Get link' },
    { icon: MdShare, text: 'Share' },
  ],
];

const Content = (props: any) => {
  const { data, onClick } = props;
  return (
    <List>
      {data.map((item: any, index: number) => (
        <React.Fragment key={index.toString()}>
          <ListItem onClick={onClick}>
            <ListItemPrimaryAction>
              <SvgIcon as={item.icon} color="textSecondary" />
            </ListItemPrimaryAction>
            <ListItemText>{item.text}</ListItemText>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

function BottomSheetBasicDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onItemClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheet open={open}>
        <Content data={listData} onClick={onItemClick} />
      </BottomSheet>
    </>
  );
}

function BottomSheetDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onBackdropClick = () => {
    setOpen(false);
  };

  const onItemClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheet open={open} onBackdropClick={onBackdropClick}>
        <Content data={listData} onClick={onItemClick} />
      </BottomSheet>
    </>
  );
}

function BottomSheetScrollDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onBackdropClick = () => {
    setOpen(false);
  };

  const onItemClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheet open={open} onBackdropClick={onBackdropClick}>
        <Content data={listScrollData} onClick={onItemClick} />
      </BottomSheet>
    </>
  );
}

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheetBasicDemo />
  </ThemeProvider>
);

export const 点击遮罩层事件 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheetDemo />
  </ThemeProvider>
);

export const 内容超出屏幕一半显示滚动条 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheetScrollDemo />
  </ThemeProvider>
);
