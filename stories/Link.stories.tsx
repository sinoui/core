import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Link from '@sinoui/core/Link';
import Typography from '@sinoui/core/Typography';

export default {
  title: 'Link',
};

const TypographyWrapper = styled(Typography)`
  > a:not(:first-child) {
    margin-left: 10px;
  }
`;

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <TypographyWrapper>
      <Link href="/?path=/story/typography--基本组件使用">Link</Link>
      <Link href="/?path=/story/typography--设置属性">Link-1</Link>
      <Link href="/?path=/story/typography--设置颜色" color="primary">
        Link-2
      </Link>
    </TypographyWrapper>
  </ThemeProvider>
);

export const 指定根元素 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Typography>
      <Link href="/?path=/story/typography--基本组件使用" component="button">
        Link
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
      <br />
      <Link href="/?path=/story/typography--设置颜色" color="secondary">
        color=secondary
      </Link>
      <br />
      <Link href="/?path=/story/typography--设置颜色" color="textPrimary">
        color=textPrimary
      </Link>
      <br />
      <Link href="/?path=/story/typography--设置颜色" color="textSecondary">
        color=textSecondary
      </Link>
      <br />
      <Link href="/?path=/story/typography--设置颜色" color="error">
        color=error
      </Link>
      <br />
      <Link href="/?path=/story/typography--设置颜色" color="warning">
        color=warning
      </Link>
      <br />
      <Link href="/?path=/story/typography--设置颜色" color="success">
        color=success
      </Link>
      <br />
      <Link href="/?path=/story/typography--设置颜色" color="info">
        color=info
      </Link>
    </Typography>
  </ThemeProvider>
);
