import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import Scrollbar from '@sinoui/core/Scrollbar';

const CustomScrollBar = styled(Scrollbar)`
  .sinoui-scrollbar__vertical-track {
    top: 8px;
    bottom: 8px;
  }
  .sinoui-scrollbar__vertical-thumb {
    background-image: linear-gradient(
      -131deg,
      rgb(231, 176, 43) 0%,
      rgb(193, 62, 81) 100%
    );
  }
`;

export default function CustomStyleDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomScrollBar
        style={{
          height: 300,
          width: 800,
          margin: '50px auto',
          background: 'rgb(245, 245, 245)',
        }}
      >
        <div
          style={{
            height: 1000,
          }}
        >
          这是一条数据
        </div>
      </CustomScrollBar>
    </ThemeProvider>
  );
}
