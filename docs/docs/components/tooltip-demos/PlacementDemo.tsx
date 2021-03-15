import React from 'react';
import Tooltip from '@sinoui/core/Tooltip';
import { Row, Column } from '@sinoui/core/Grid';
import Button from '@sinoui/core/Button';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const StyledButton = styled(Button)`
  height: 50px;
`;
function PlacementDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Row>
        <Column
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tooltip
            title="提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示"
            placement="top-start"
            trigger="hover"
          >
            <StyledButton>TOP-START</StyledButton>
          </Tooltip>
          <Tooltip title="提示提示提示提示" placement="top" trigger="hover">
            <StyledButton>TOP</StyledButton>
          </Tooltip>
          <Tooltip
            title="提示提示提示提示提示"
            placement="top-end"
            trigger="hover"
          >
            <StyledButton>TOP-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left-start" trigger="hover">
            <StyledButton>LEFT-START</StyledButton>
          </Tooltip>
        </Column>
        <Column
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="提示" placement="right-start" trigger="hover">
            <StyledButton>RIGHT-START</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left" trigger="hover">
            <StyledButton>LEFT</StyledButton>
          </Tooltip>
        </Column>
        <Column
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="提示" placement="right" trigger="hover">
            <StyledButton>RIGHT </StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left-end" trigger="hover">
            <StyledButton>LEFT-END</StyledButton>
          </Tooltip>
        </Column>
        <Column
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="提示" placement="right-end" trigger="hover">
            <StyledButton>RIGHT-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tooltip title="提示" placement="bottom-start" trigger="hover">
            <StyledButton>BOTTOM-START</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="bottom" trigger="hover">
            <StyledButton>BOTTOM</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="bottom-end" trigger="hover">
            <StyledButton>BOTTOM-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
    </ThemeProvider>
  );
}

export default PlacementDemo;
