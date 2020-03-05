/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import FavoriteIcon from './Favorite';

const StyleButton = styled(Button)`
  margin: 8px;
`;

export default function ButtonWithIconDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <StyleButton>
          <FavoriteIcon />
          icon
        </StyleButton>
        <StyleButton>
          icon
          <FavoriteIcon />
        </StyleButton>
        <StyleButton outlined>
          <FavoriteIcon />
          icon
        </StyleButton>
        <StyleButton outlined>
          icon
          <FavoriteIcon />
        </StyleButton>
        <StyleButton raised>
          <FavoriteIcon />
          icon
        </StyleButton>
        <StyleButton raised>
          icon
          <FavoriteIcon />
        </StyleButton>
      </>
    </ThemeProvider>
  );
}
