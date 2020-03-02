/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';

const StyleButton = styled(Button)`
  margin: 8px;
`;

export default function RaisedButtonDemo() {
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
        <StyleButton>
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          icon
        </StyleButton>
      </>
    </ThemeProvider>
  );
}
