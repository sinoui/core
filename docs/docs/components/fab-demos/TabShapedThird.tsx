import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Fab from '@sinoui/core/Fab';
import { MdAdd } from 'react-icons/md';

const TabShaped = styled(Fab)`
  border-radius: 12px;

  .sinoui-fab-extended__ripple-layout {
    border-radius: 12px;
  }
  .sinoui-fab-extended__ripple {
    border-radius: 12px;
  }
`;

export default function TabShapedThird() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TabShaped extended>
        <MdAdd style={{ fontSize: '24px', marginRight: '12px' }} />
        <span>按钮</span>
      </TabShaped>
    </ThemeProvider>
  );
}
