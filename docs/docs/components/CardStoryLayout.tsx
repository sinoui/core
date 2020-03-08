import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

interface Props {
  children: React.ReactNode;
  height?: number;
  style?: React.CSSProperties;
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
  const { children, height, style } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container height={height} style={style}>
        {children}
      </Container>
    </ThemeProvider>
  );
}
