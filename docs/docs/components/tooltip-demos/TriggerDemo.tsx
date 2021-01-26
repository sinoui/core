import React from 'react';
import Tooltip from '@sinoui/core/Tooltip';
import { Row, Column } from '@sinoui/core/Grid';
import Button from '@sinoui/core/Button';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

function TriggerDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Row>
        <Column xs={8}>
          <Tooltip title="这是一段提示文字" trigger="hover">
            <Button raised>hover</Button>
          </Tooltip>
        </Column>
        <Column xs={8}>
          <Tooltip title="这是一段提示文字" trigger="focus">
            <input placeholder="focus" />
          </Tooltip>
        </Column>
        <Column xs={8}>
          <Tooltip title="这是一段提示文字" trigger="click">
            <Button raised>click</Button>
          </Tooltip>
        </Column>
      </Row>
    </ThemeProvider>
  );
}

export default TriggerDemo;
