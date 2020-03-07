import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Divider from '@sinoui/core/Divider';
import { VertivalFullDivider, HorizontalDivider } from './dividerDemo';

export default {
  title: 'Divider',
};

export const 默认水平全宽分割线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider />
  </ThemeProvider>
);

export const 水平中间分隔线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider middle />
  </ThemeProvider>
);

export const 水平中间分隔线指定marginHorizontal = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider middle marginHorizontal={0} />
  </ThemeProvider>
);

export const 水平分隔线指定marginHorizontal = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider marginHorizontal={24} />
  </ThemeProvider>
);

export const 水平插入分隔线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider inset as="div" className="test" />
  </ThemeProvider>
);

export const 水平插入分隔线指定className = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider className="test" />
  </ThemeProvider>
);

export const 水平插入分隔线指定style = () => (
  <ThemeProvider theme={defaultTheme}>
    <Divider style={{ marginLeft: '200px' }} />
  </ThemeProvider>
);

export const 默认垂直分隔线 = () => (
  <ThemeProvider theme={defaultTheme}>
    <VertivalFullDivider />
  </ThemeProvider>
);

export const 垂直分隔线8px垂直间距 = () => (
  <ThemeProvider theme={defaultTheme}>
    <VertivalFullDivider marginVertical={8} />
  </ThemeProvider>
);

export const 垂直分隔线上边距8px = () => (
  <ThemeProvider theme={defaultTheme}>
    <VertivalFullDivider marginTop={8} />
  </ThemeProvider>
);

export const 垂直分隔线下边距8px = () => (
  <ThemeProvider theme={defaultTheme}>
    <VertivalFullDivider marginBottom={8} />
  </ThemeProvider>
);
export const 水平分隔线实例默认 = () => (
  <ThemeProvider theme={defaultTheme}>
    <HorizontalDivider />
  </ThemeProvider>
);

export const 水平分隔线实例居中 = () => (
  <ThemeProvider theme={defaultTheme}>
    <HorizontalDivider middle />
  </ThemeProvider>
);

export const 水平分隔线实例嵌入 = () => (
  <ThemeProvider theme={defaultTheme}>
    <HorizontalDivider inset />
  </ThemeProvider>
);

export const 水平分隔线水平边距24px = () => (
  <ThemeProvider theme={defaultTheme}>
    <HorizontalDivider inset marginHorizontal={24} />
  </ThemeProvider>
);

export const 水平分隔线左边距24px = () => (
  <ThemeProvider theme={defaultTheme}>
    <HorizontalDivider marginLeft={24} />
  </ThemeProvider>
);

export const 水平分隔线右边距24px = () => (
  <ThemeProvider theme={defaultTheme}>
    <HorizontalDivider marginRight={24} />
  </ThemeProvider>
);
