import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import BaseButton from '@sinoui/core/BaseButton';

export default {
  title: 'BaseButton',
};

export const 包含文本 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseButton>按钮</BaseButton>
  </ThemeProvider>
);

export const 包含Emoji = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseButton>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </BaseButton>
  </ThemeProvider>
);

export const 链接按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <BaseButton as="a" href="https://www.baidu.com/">
        百度链接
      </BaseButton>
      <BaseButton href="https://github.com/">github官网</BaseButton>
    </div>
  </ThemeProvider>
);

export const 禁用涟漪效果 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseButton ripple={false}>禁用涟漪效果</BaseButton>
  </ThemeProvider>
);

export const 自定义涟漪样式 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseButton ripple={{ color: 'red' }}>自定义涟漪效果</BaseButton>
  </ThemeProvider>
);
