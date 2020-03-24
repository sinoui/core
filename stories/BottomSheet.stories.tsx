import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import BottomSheet from '@sinoui/core/BottomSheet';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';

export default {
  title: 'BottomSheet',
};

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheet>内容</BottomSheet>
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
        11111
      </BottomSheet>
    </>
  );
}

export const 点击遮罩层隐藏 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomSheetDemo />
  </ThemeProvider>
);
