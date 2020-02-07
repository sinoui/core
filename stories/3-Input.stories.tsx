import React from 'react';
import Input from '@sinoui/core/Input';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdVisibilityOff } from 'react-icons/md';

export default {
  title: 'Input',
};

export const 展示输入框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Input placeholder="请输入姓名" />
  </ThemeProvider>
);

export const 自动获取焦点 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Input autoFocus placeholder="请输入姓名" />
  </ThemeProvider>
);

export const 密码输入框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Input
      type="password"
      placeholder="输入密码"
      endComponent={<MdVisibilityOff />}
    />
  </ThemeProvider>
);
