import React from 'react';
import IconButton from '@sinoui/core/IconButton';
import Add from '@sinoui/icons/Add';
import Fab from '@sinoui/core/Fab';
import Tooltip from '@sinoui/core/Tooltip';
import { Row, Column } from '@sinoui/core/Grid';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default function BaseDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Row gutter={8}>
        <Column xs={6}>
          <Tooltip title="add" trigger="hover">
            <IconButton>
              <Add />
            </IconButton>
          </Tooltip>
        </Column>
        <Column xs={6}>
          <Tooltip title="add" trigger="hover">
            <Fab>
              <Add />
            </Fab>
          </Tooltip>
        </Column>
      </Row>
    </ThemeProvider>
  );
}
