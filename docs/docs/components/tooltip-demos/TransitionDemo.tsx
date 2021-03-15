import React from 'react';
import Tooltip from '@sinoui/core/Tooltip';
import Button from '@sinoui/core/Button';
import { Row, Column } from '@sinoui/core/Grid';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Fade from '@sinoui/core/Fade';

export default function TransitionDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Row>
        <Column xs={12}>
          <Tooltip title="fade" trigger="click" transitionComponent={Fade}>
            <Button raised>fade</Button>
          </Tooltip>
        </Column>
        <Column xs={12}>
          <Tooltip title="Grow" trigger="click">
            <Button raised>默认Grow</Button>
          </Tooltip>
        </Column>
      </Row>
    </ThemeProvider>
  );
}
