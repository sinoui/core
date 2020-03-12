import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import IconButton from '@sinoui/core/IconButton';
import Favorite from '@sinoui/icons/Favorite';
import FavoriteBorder from '@sinoui/icons/FavoriteBorder';
import { Button } from '../src';

export default {
  title: 'IconButton',
};

function SvgIcon({ outlined }: { outlined?: boolean }) {
  return outlined ? <FavoriteBorder /> : <Favorite />;
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
        <StyledIconButton onClick={onClick}>
          <SvgIcon outlined={!selected} />
        </StyledIconButton>
        <StyledIconButton color="primary" onClick={onClick}>
          <SvgIcon outlined={!selected} />
        </StyledIconButton>
        <StyledIconButton color="secondary" onClick={onClick}>
          <SvgIcon outlined={!selected} />
        </StyledIconButton>
        <StyledIconButton color="error" onClick={onClick}>
          <SvgIcon outlined={!selected} />
        </StyledIconButton>
        <StyledIconButton color="warning" onClick={onClick}>
          <SvgIcon outlined={!selected} />
        </StyledIconButton>
        <StyledIconButton color="info" onClick={onClick}>
          <SvgIcon outlined={!selected} />
        </StyledIconButton>
        <StyledIconButton color="success" onClick={onClick}>
          <SvgIcon outlined={!selected} />
        </StyledIconButton>
        <Button onClick={onClick}>切换选中状态</Button>
      </>
    </ThemeProvider>
  );
};
