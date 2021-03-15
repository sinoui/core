import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Breadcrumb from '@sinoui/core/Breadcrumb';
import Typography from '@sinoui/core/Typography';
import Link from '@sinoui/core/Link';
import Home from '@sinoui/icons/Home';
import Star from '@sinoui/icons/Star';
import Favorite from '@sinoui/icons/Favorite';

export default {
  title: 'Breadcrumb',
};

const BreadcrumbDemo = (props: any) => {
  const { separator, component, color } = props;
  return (
    <Breadcrumb separator={separator} component={component} color={color}>
      <Link href="/?path=/story/typography--基本组件使用">Material-UI</Link>
      <Link href="/?path=/story/typography--设置属性">Core</Link>
      <Link href="/?path=/story/typography--设置颜色">UI</Link>
      <Typography type="body1" color={color ? 'white' : 'textPrimary'}>
        Breadcrumb
      </Typography>
    </Breadcrumb>
  );
};

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BreadcrumbDemo />
  </ThemeProvider>
);

export const 指定分隔符 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BreadcrumbDemo separator=">" />
  </ThemeProvider>
);

export const 指定图标 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Breadcrumb>
      <Link href="/?path=/story/typography--基本组件使用">
        <Home />
        Material-UI
      </Link>
      <Link href="/?path=/story/typography--设置属性">
        <Star />
        Core
      </Link>
      <Link href="/?path=/story/typography--设置颜色">
        <Favorite />
        UI
      </Link>
      <Typography type="body1" color="textPrimary">
        Breadcrumb
      </Typography>
    </Breadcrumb>
  </ThemeProvider>
);

export const 指定元素属性 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BreadcrumbDemo component="div" />
  </ThemeProvider>
);

export const 指定背景颜色 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BreadcrumbDemo color="primary" />
  </ThemeProvider>
);
