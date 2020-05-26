import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Link from '@sinoui/core/Link';
import Typography from '@sinoui/core/Typography';

export default {
  title: 'Link',
};

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Typography>
      <Link href="/?path=/story/typography--基本组件使用">Link</Link>
      <Link href="/?path=/story/typography--设置属性">Link-1</Link>
      <Link href="/?path=/story/typography--设置颜色" color="primary">
        Link-2
      </Link>
    </Typography>
  </ThemeProvider>
);

export const 指定根元素 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Typography>
      <Link href="/?path=/story/typography--基本组件使用" component="a">
        Link
      </Link>
      <Link href="/?path=/story/typography--设置属性" component="div">
        Link-1
      </Link>
      <Link
        href="/?path=/story/typography--设置颜色"
        color="primary"
        component="p"
      >
        Link-2
      </Link>
    </Typography>
  </ThemeProvider>
);

export const 指定颜色 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Typography>
      <Link href="/?path=/story/typography--设置颜色" color="primary">
        color=primary
      </Link>
      <Link href="/?path=/story/typography--设置颜色" color="warning">
        color=warning
      </Link>
      <Link href="/?path=/story/typography--设置颜色" color="success">
        color=success
      </Link>
    </Typography>
  </ThemeProvider>
);
