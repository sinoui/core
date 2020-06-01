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
          <Tooltip title="提示" placement="top-start">
            <StyledButton>TOP-START</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="top">
            <StyledButton>TOP</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="top-end">
            <StyledButton>TOP-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left-start">
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
          <Tooltip title="提示" placement="right-start">
            <StyledButton>RIGHT-START</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left">
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
          <Tooltip title="提示" placement="right">
            <StyledButton>RIGHT </StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left-end">
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
          <Tooltip title="提示" placement="right-end">
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
          <Tooltip title="提示" placement="bottom-start">
            <StyledButton>BOTTOM-START</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="bottom">
            <StyledButton>BOTTOM</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="bottom-end">
            <StyledButton>BOTTOM-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
    </ThemeProvider>
  );
}

export default PlacementDemo;
