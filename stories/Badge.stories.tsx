import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import SvgIcon from '@sinoui/core/SvgIcon';
import { MdEmail } from 'react-icons/md';
import Badge from '@sinoui/core/Badge';

export default {
  title: 'Badge',
};

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge>
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 指定数字 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={8}>
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 设置数字为0时显示 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={0} showZero>
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 设置为圆点形式 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={1} dot>
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 设置鼠标悬浮时显示的文字 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={1} title="文字">
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 设置自定义badge的内容 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={1} badgeContent={4}>
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 指定封顶数值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={99} overflowCount={99}>
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={100} overflowCount={99}>
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 设置徽标的显示位置 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={8} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={8} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={8} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={8} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);

export const 指定颜色 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Badge count={99} color="primary">
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={99} color="secondary">
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={99} color="warning">
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={99} color="success">
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={99} color="error">
      <SvgIcon as={MdEmail} />
    </Badge>
    <p />
    <Badge count={99} color="info">
      <SvgIcon as={MdEmail} />
    </Badge>
  </ThemeProvider>
);
