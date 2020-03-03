import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { BaseAppBarDemo, AppBarInput } from './appBarDemos';

export default {
  title: 'AppBar',
};

export const 常规模式AppBar = () => <BaseAppBarDemo />;

export const 常规紧凑模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo dense />
  </ThemeProvider>
);

export const 突出模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo prominent />
  </ThemeProvider>
);

export const 突出紧凑模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo prominent dense />
  </ThemeProvider>
);

export const 固定位置AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo fixed />
  </ThemeProvider>
);

export const 收缩模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo fixed short />
  </ThemeProvider>
);

export const 带有输入框的AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppBarInput />
  </ThemeProvider>
);

export const 带有输入框的突出AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppBarInput prominent />
  </ThemeProvider>
);
