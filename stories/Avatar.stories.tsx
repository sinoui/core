import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Avatar from '@sinoui/core/Avatar';
import { MdAdd } from 'react-icons/md';
import SvgIcon from '@sinoui/core/SvgIcon';
import avatarf from './img/avatarf.jpg';
import avatars from './img/avatars.jpg';
import avatart from './img/avatart.jpg';

export default {
  title: 'Avatar',
};

export const 图片头像 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Avatar>
      <img src={avatarf} />
    </Avatar>
    <Avatar>
      <img src={avatars} />
    </Avatar>
    <Avatar>
      <img src={avatart} />
    </Avatar>
  </ThemeProvider>
);

export const 字母头像 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Avatar>H</Avatar>
    <Avatar>N</Avatar>
    <Avatar>LX</Avatar>
  </ThemeProvider>
);

export const 图标头像 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Avatar>
      <SvgIcon>
        <MdAdd />
      </SvgIcon>
    </Avatar>
  </ThemeProvider>
);

export const 设置不同背景颜色 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Avatar color="primary">LX</Avatar>
    <Avatar color="secondary">LX</Avatar>
    <Avatar color="warning">LX</Avatar>
    <Avatar color="error">LX</Avatar>
    <Avatar color="success">LX</Avatar>
    <Avatar color="info">LX</Avatar>
    <Avatar color="actionActive">LX</Avatar>
    <Avatar color="actionDisabled">LX</Avatar>
  </ThemeProvider>
);
