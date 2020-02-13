import React from 'react';
import Menu, { MenuListItem } from '@sinoui/core/Menu';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'Menu',
};

export const 渲染Menu列表 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Menu style={{ margin: 96 }}>
      <MenuListItem>选项一</MenuListItem>
      <MenuListItem>选项二</MenuListItem>
      <MenuListItem>选项三</MenuListItem>
    </Menu>
  </ThemeProvider>
);
