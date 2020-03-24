import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

interface Props {
  children: React.ReactNode;
  style: React.CSSProperties;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 20vh;
  padding: 16px;
`;

/**
 * demo布局组件
 */
export default function StoryLayout(props: Props) {
  const { children, style } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container style={style}>{children}</Container>
    </ThemeProvider>
  );
}
