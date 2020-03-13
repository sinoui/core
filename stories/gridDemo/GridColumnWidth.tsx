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
          <Column style={{ width: '200px', flexGrow: 0 }}>
            <div>width: 200px</div>
          </Column>
          <Column sm={24}>
            <div>col-sm-24,其余auto</div>
          </Column>
          <Column>
            <div>auto</div>
          </Column>
          <Column>
            <div>auto</div>
          </Column>
        </Row>
      </Wrapper>
    </ThemeProvider>
  );
}
