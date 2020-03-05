import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

interface Props {
  children: React.ReactNode;
  height?: number;
}

const Container = styled.div<Props>`
  display: flex;
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 20vh;
  padding: 16px;
  height: ${({ height }) => height && height}px;
`;

/**
 * demo布局组件
 */
export default function StoryLayout(props: Props) {
  const { children, height } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container height={height}>{children}</Container>
    </ThemeProvider>
  );
}
