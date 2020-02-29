import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import {
  MediaUIControls0,
  MediaUIControls1,
  BorderCard,
  CardSelected,
  TextCards,
  MedaiButtonCard,
  HeaderCard,
  ExpandCard,
} from './CardDemo';

export default {
  title: 'CardDemo',
};

export const UIControls0 = () => (
  <ThemeProvider theme={defaultTheme}>
    <MediaUIControls0 />
  </ThemeProvider>
);

export const UIControls1 = () => (
  <ThemeProvider theme={defaultTheme}>
    <MediaUIControls1 />
  </ThemeProvider>
);

export const 卡片的各种交互状态 = () => (
  <ThemeProvider theme={defaultTheme}>
    <CardSelected />
  </ThemeProvider>
);

export const 文字组合卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <TextCards />
  </ThemeProvider>
);

export const 边框模式的简单卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BorderCard />
  </ThemeProvider>
);

export const 带有图片和操作按钮的卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <MedaiButtonCard />
  </ThemeProvider>
);

export const 有cardHeader的卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <HeaderCard />
  </ThemeProvider>
);

export const 可展开的卡片 = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ExpandCard />
    </ThemeProvider>
  );
};
