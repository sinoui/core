import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Breadcrumb from '@sinoui/core/Breadcrumb';
import Typography from '@sinoui/core/Typography';
// import Link from 'react-router-dom';

export default {
  title: 'Breadcrumb',
};

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Breadcrumb>
      {/* <Link color="inherit" to="/">
        Material-UI
      </Link>
      <Link color="inherit" to="/getting-started/installation/">
        Core
      </Link>
      <Link color="textPrimary" to="/components/Breadcrumbs/">
        Breadcrumb
      </Link> */}
      <Typography color="textPrimary">Breadcrumb</Typography>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </Breadcrumb>
  </ThemeProvider>
);

export const 指定分隔符 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Breadcrumb separator=">">
      {/* <Link color="inherit" to="/">
        Material-UI
      </Link>
      <Link color="inherit" to="/getting-started/installation/">
        Core
      </Link>
      <Link color="textPrimary" to="/components/Breadcrumbs/">
        Breadcrumb
      </Link> */}
      <Typography color="textPrimary">Breadcrumb</Typography>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </Breadcrumb>
  </ThemeProvider>
);

export const 指定元素属性 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Breadcrumb component="div">
      {/* <Link color="inherit" to="/">
        Material-UI
      </Link>
      <Link color="inherit" to="/getting-started/installation/">
        Core
      </Link>
      <Link color="textPrimary" to="/components/Breadcrumbs/">
        Breadcrumb
      </Link> */}
      <Typography color="textPrimary">Breadcrumb</Typography>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </Breadcrumb>
  </ThemeProvider>
);

export const 指定背景颜色 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Breadcrumb color="primary">
      {/* <Link color="inherit" to="/">
        Material-UI
      </Link>
      <Link color="inherit" to="/getting-started/installation/">
        Core
      </Link>
      <Link color="textPrimary" to="/components/Breadcrumbs/">
        Breadcrumb
      </Link> */}
      <Typography color="textPrimary">Breadcrumb</Typography>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </Breadcrumb>
  </ThemeProvider>
);
