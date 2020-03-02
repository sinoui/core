import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Divider from '@sinoui/core/Divider';
import { VertivalFullDivider } from './dividerDemo';

export default {
  title: 'Divider',
};

export const 默认分割线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ height: '100px' }}>
      <Divider />
    </div>
  </ThemeProvider>
);

export const 水平全宽分割线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider horizontal />
  </ThemeProvider>
);

export const 水平中间分隔线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider horizontal middle />
  </ThemeProvider>
);

export const 水平中间分隔线指定marginHorizontal = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider horizontal middle marginHorizontal={0} />
  </ThemeProvider>
);

export const 水平分隔线指定marginHorizontal = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider horizontal marginHorizontal={24} />
  </ThemeProvider>
);

export const 水平插入分隔线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider horizontal inset as="div" className="test" />
  </ThemeProvider>
);

export const 垂直分隔线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <VertivalFullDivider />
  </ThemeProvider>
);
