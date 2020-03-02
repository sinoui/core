import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import IconButton from '@sinoui/core/IconButton';
import { Button } from '../src';

export default {
  title: 'IconButton',
};

function SvgIcon() {
  return (
    <svg height="24" viewBox="0 0 24 24" width="24">
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

const StyledIconButton = styled(IconButton)`
  margin: 8px;
`;

export const 基础图标按钮 = () => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <StyledIconButton>
        <SvgIcon />
      </StyledIconButton>
      <StyledIconButton color="primary">
        <SvgIcon />
      </StyledIconButton>
      <StyledIconButton color="secondary">
        <SvgIcon />
      </StyledIconButton>
      <StyledIconButton color="error">
        <SvgIcon />
      </StyledIconButton>
      <StyledIconButton color="warning">
        <SvgIcon />
      </StyledIconButton>
      <StyledIconButton color="info">
        <SvgIcon />
      </StyledIconButton>
      <StyledIconButton color="success">
        <SvgIcon />
      </StyledIconButton>
      <StyledIconButton disabled>
        <SvgIcon />
      </StyledIconButton>
    </>
  </ThemeProvider>
);

export const 切换按钮选中状态 = () => {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <StyledIconButton selected={selected}>
          <SvgIcon />
        </StyledIconButton>
        <Button onClick={onClick}>切换选中状态</Button>
      </>
    </ThemeProvider>
  );
};
