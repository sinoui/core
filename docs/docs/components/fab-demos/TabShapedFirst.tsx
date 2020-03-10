import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Fab from '@sinoui/core/Fab';
import { MdAdd } from 'react-icons/md';

const TabShaped = styled(Fab)`
  border-radius: 50% 0;
  padding: 0;
  width: 56px;
  height: 56px;
  font-size: 24px;
  .sinoui-fab-extended__ripple-layout {
    width: 56px;
    height: 56px;
    border-radius: 50% 0;
  }
  .sinoui-fab-extended__ripple {
    width: 56px;
    height: 56px;
    border-radius: 50% 0;
  }
`;

export default function TabShapedFirst() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TabShaped extended>
        <MdAdd />
      </TabShaped>
    </ThemeProvider>
  );
}
