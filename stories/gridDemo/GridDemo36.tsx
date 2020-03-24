import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { Row, Column } from '@sinoui/core/Grid';
import { RowProps } from '@sinoui/core/Grid/Row';
import Wrapper from './Wrapper';

export default function Demo({
  gutter,
  gutterType = 'between',
  justifyContent,
  alignItems,
}: RowProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>
        <Row
          gutterType={gutterType}
          gutter={gutter}
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          <Column xs={12} md={6}>
            <div>col-xs-12,col-md-6</div>
          </Column>
          <Column xs={12} md={6}>
            <div>col-xs-12,col-md-6</div>
          </Column>
          <Column xs={12} md={6}>
            <div>col-xs-12,col-md-6</div>
          </Column>
          <Column xs={12} md={6}>
            <div>col-xs-12,col-md-6</div>
          </Column>
          <Column xs={12} md={6}>
            <div>col-xs-12,col-md-6</div>
          </Column>
          <Column xs={12} md={6}>
            <div>col-xs-12,col-md-6</div>
          </Column>
        </Row>
      </Wrapper>
    </ThemeProvider>
  );
}
