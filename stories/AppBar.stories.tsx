import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { BaseAppBarDemo, AppBarInput, AppBarInputRight } from './appBarDemos';

export default {
  title: 'AppBar',
};

export const 常规模式AppBar = () => <BaseAppBarDemo />;

export const 紧凑模式AppBar = () => (
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

export const 可收缩模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo short />
  </ThemeProvider>
);

export const 一直处于收缩模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo shortCollapsed />
  </ThemeProvider>
);

export const 固定AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo fixed />
  </ThemeProvider>
);

export const 固定突出模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo fixed prominent />
  </ThemeProvider>
);

export const 固定突出紧凑模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo fixed prominent dense />
  </ThemeProvider>
);

export const 固定可收缩模式AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseAppBarDemo fixed short />
  </ThemeProvider>
);

export const 带有输入框的AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppBarInput />
  </ThemeProvider>
);

export const 带有搜索框的突出AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppBarInput prominent />
  </ThemeProvider>
);

export const 带有搜索框在右侧的AppBar = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppBarInputRight />
  </ThemeProvider>
);
