import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Paper from '@sinoui/core/Paper';

export default {
  title: 'Paper',
};

const Div = styled.div`
  width: 128px;
  height: 128px;
  margin: 8px;
`;

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Paper>
      <Div>Paper Content</Div>
    </Paper>
  </ThemeProvider>
);

export const 设置阴影高度 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Paper elevation={4}>
      <Div>Paper Content</Div>
    </Paper>
  </ThemeProvider>
);

export const 设置是否显示圆角 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Paper square>
      <Div>Paper Content</Div>
    </Paper>
  </ThemeProvider>
);

export const 设置是否全屏显示 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Paper fullWidth>
      <Div>Paper Content</Div>
    </Paper>
  </ThemeProvider>
);
