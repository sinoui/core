import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Paper from '@sinoui/core/Paper';

export default {
  title: 'Paper',
};

const PaperWrapper = styled(Paper)`
  width: 128px;
  height: 128px;
  margin: 8px;
`;

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <PaperWrapper>Paper Content</PaperWrapper>
  </ThemeProvider>
);

export const 设置阴影高度 = () => (
  <ThemeProvider theme={defaultTheme}>
    <PaperWrapper elevation={4}>Paper Content</PaperWrapper>
  </ThemeProvider>
);

export const 设置是否显示圆角 = () => (
  <ThemeProvider theme={defaultTheme}>
    <PaperWrapper square>Paper Content</PaperWrapper>
  </ThemeProvider>
);

export const 设置轮廓模式 = () => (
  <ThemeProvider theme={defaultTheme}>
    <PaperWrapper outlined>Paper Content</PaperWrapper>
  </ThemeProvider>
);
