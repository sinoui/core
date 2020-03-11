import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import Favorite from '@sinoui/icons/Favorite';

export default {
  title: 'Button',
};

const StyleButton = styled(Button)`
  margin: 8px;
`;

export const 文本按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <StyleButton>default</StyleButton>
      <StyleButton color="primary">primary</StyleButton>
      <StyleButton color="secondary">secondary</StyleButton>
      <StyleButton color="error">error</StyleButton>
      <StyleButton color="warning">warning</StyleButton>
      <StyleButton color="info">info</StyleButton>
      <StyleButton color="success">success</StyleButton>
      <StyleButton disabled>disabled</StyleButton>
      <StyleButton>
        <Favorite />
        icon
      </StyleButton>
      <StyleButton>
        icon
        <Favorite />
      </StyleButton>
      <StyleButton href="https://www.baidu.com/">Link</StyleButton>
    </>
  </ThemeProvider>
);

export const 轮廓按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <StyleButton outlined>default</StyleButton>
      <StyleButton outlined color="primary">
        primary
      </StyleButton>
      <StyleButton outlined color="secondary">
        secondary
      </StyleButton>
      <StyleButton outlined color="error">
        error
      </StyleButton>
      <StyleButton outlined color="warning">
        warning
      </StyleButton>
      <StyleButton outlined color="info">
        info
      </StyleButton>
      <StyleButton outlined color="success">
        success
      </StyleButton>
      <StyleButton outlined disabled>
        disabled
      </StyleButton>
      <StyleButton outlined>
        <Favorite />
        icon
      </StyleButton>
      <StyleButton outlined>
        icon
        <Favorite />
      </StyleButton>
      <StyleButton outlined href="https://www.baidu.com/">
        Link
      </StyleButton>
    </>
  </ThemeProvider>
);

export const 容器按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <StyleButton raised>default</StyleButton>
      <StyleButton raised color="primary">
        primary
      </StyleButton>
      <StyleButton raised color="secondary">
        secondary
      </StyleButton>
      <StyleButton raised color="error">
        error
      </StyleButton>
      <StyleButton raised color="warning">
        warning
      </StyleButton>
      <StyleButton raised color="info">
        info
      </StyleButton>
      <StyleButton raised color="success">
        success
      </StyleButton>
      <StyleButton raised disabled>
        disabled
      </StyleButton>
      <StyleButton raised>
        <Favorite />
        icon
      </StyleButton>
      <StyleButton raised>
        icon
        <Favorite />
      </StyleButton>
      <StyleButton raised href="https://www.baidu.com/">
        Link
      </StyleButton>
    </>
  </ThemeProvider>
);

export const 禁用海拔高度按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <StyleButton disableElevation raised>
        default
      </StyleButton>
      <StyleButton disableElevation raised color="primary">
        primary
      </StyleButton>
      <StyleButton raised disableElevation color="secondary">
        secondary
      </StyleButton>
      <StyleButton raised disableElevation color="error">
        error
      </StyleButton>
      <StyleButton raised disableElevation color="warning">
        warning
      </StyleButton>
      <StyleButton raised disableElevation color="info">
        info
      </StyleButton>
      <StyleButton raised disableElevation color="success">
        success
      </StyleButton>
      <StyleButton raised disableElevation disabled>
        disabled
      </StyleButton>
      <StyleButton disableElevation raised>
        <Favorite />
        icon
      </StyleButton>
    </>
  </ThemeProvider>
);
