/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';

const StyleButton = styled(Button)`
  margin: 8px;
`;

const LinkButton = styled(StyleButton)`
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

export default function RaisedButtonDemo() {
  return (
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
        <StyleButton raised disableElevation>
          disableElevation
        </StyleButton>
        <LinkButton raised href="https://www.baidu.com/">
          Link
        </LinkButton>
      </>
    </ThemeProvider>
  );
}
