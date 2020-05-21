import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const ResetCss = createGlobalStyle`
  html,body {
    padding: 0;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
`;

/**
 * demo布局组件
 */
export default function StoryLayout(props: Props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Container>{props.children}</Container>
        <ResetCss />
      </>
    </ThemeProvider>
  );
}
