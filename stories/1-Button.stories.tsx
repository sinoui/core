import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';

export default {
  title: 'Button',
};

export const 文本按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Button>default</Button>
  </ThemeProvider>
);

export const 轮廓按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Button outlined>outlined button</Button>
  </ThemeProvider>
);

export const 容器按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Button raised>raised button </Button>
  </ThemeProvider>
);
