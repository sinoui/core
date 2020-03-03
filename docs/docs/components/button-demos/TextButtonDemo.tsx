/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';

const StyleButton = styled(Button)`
  margin: 8px;
`;

export default function TextButtonDemo() {
  return (
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
        <StyleButton href="https://www.baidu.com/">Link</StyleButton>
      </>
    </ThemeProvider>
  );
}
