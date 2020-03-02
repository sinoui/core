/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';

const StyleButton = styled(Button)`
  margin: 8px;
`;

export default function OutlinedButtonDemo() {
  return (
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
      </>
    </ThemeProvider>
  );
}
