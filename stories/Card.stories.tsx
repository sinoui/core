import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import Card from '@sinoui/core/Card';
import './card.css';

export default {
  title: 'Card',
};

export const 默认样式 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card>文本</Card>
  </ThemeProvider>
);

export const 有边框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card outlined>文本</Card>
  </ThemeProvider>
);

export const 有内联样式 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card style={{ padding: '16px' }}>文本</Card>
  </ThemeProvider>
);

export const 有自定义样式 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card className="padding bg-color">文本</Card>
  </ThemeProvider>
);

export const 点击事件 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card
      as="p"
      onClick={() => {
        alert('hello world');
      }}
    >
      文本
    </Card>
  </ThemeProvider>
);
