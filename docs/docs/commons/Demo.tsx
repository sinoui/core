import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';

const DemoWrapper = styled.div`
  background: ${(props) => props.theme.palette.background.default};
  padding: 32px;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  margin: 16px 0 32px;
`;

const Demo: React.SFC = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <DemoWrapper>{children}</DemoWrapper>
    </ThemeProvider>
  );
};

export default Demo;
