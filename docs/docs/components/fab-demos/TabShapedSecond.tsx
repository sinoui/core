import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Fab from '@sinoui/core/Fab';
import { MdAdd } from 'react-icons/md';

const TabShaped = styled(Fab)`
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 0;
  .sinoui-fab-extended__ripple-layout {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
  .sinoui-fab-extended__ripple {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
`;

export default function TabShapedSecond() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TabShaped extended>
        <MdAdd />
      </TabShaped>
    </ThemeProvider>
  );
}
