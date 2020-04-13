/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import IconButton from '@sinoui/core/IconButton';
import FavoriteIcon from '@sinoui/icons/Favorite';

const StyledIconButton = styled(IconButton)`
  margin: 8px;
`;
export default function IconButtonDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <StyledIconButton>
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton color="textPrimary">
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton color="primary">
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton color="secondary">
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton color="error">
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton color="warning">
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton color="info">
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton color="success">
          <FavoriteIcon />
        </StyledIconButton>
        <StyledIconButton disabled>
          <FavoriteIcon />
        </StyledIconButton>
      </>
    </ThemeProvider>
  );
}
