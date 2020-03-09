import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { Row, Column } from '@sinoui/core/Grid';
import { GridDemo } from './gridDemo';
export default {
  title: 'Grid',
};

export const gutterType默认gutter为8 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Row gutter={8}>
      <Column xs={12}>
        <div>col-xs-12</div>
      </Column>
      <Column xs={12}>
        <div>col-xs-12</div>
      </Column>
    </Row>
  </ThemeProvider>
);

export const 响应式 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ background: '#f5f5f5' }}>
      <Row gutter={8} gutterType="around">
        <Column xs={12} md={24}>
          <div>col-xs-12,col-md-24</div>
        </Column>
        <Column xs={11}>
          <div>col-xs-11</div>
        </Column>
        <Column xs={13}>
          <div>col-xs-13</div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <div>col-xs-12,col-sm-6,col-md-4,col-lg-3</div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <div>col-xs-12,col-sm-6,col-md-4,col-lg-3</div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <div>col-xs-12,col-sm-6,col-md-4,col-lg-3</div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <div>col-xs-12,col-sm-6,col-md-4,col-lg-3</div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <div>col-xs-12,col-sm-6,col-md-4,col-lg-3</div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <div>col-xs-12,col-sm-6,col-md-4,col-lg-3</div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <div>col-xs-12,col-sm-6,col-md-4,col-lg-3</div>
        </Column>
      </Row>
    </div>
  </ThemeProvider>
);

export const 启用flex布局 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Row gutter={8} style={{ background: '#f5f5f5' }}>
      <Column
        xs={12}
        flexContainer
        justifyContent="center"
        alignItems="center"
        style={{ height: '100px' }}
      >
        <div>col-xs-12</div>
        <div>col-xs-12</div>
      </Column>
      <Column xs={12}>
        <div>col-xs-12</div>
        <div>col-xs-12</div>
      </Column>
    </Row>
  </ThemeProvider>
);

export const 默认值示例 = () => <GridDemo />;

export const gutterType默认为between且gutter为8 = () => <GridDemo gutter={8} />;

export const gutterType为around且gutter为8 = () => (
  <GridDemo gutterType="around" gutter={8} />
);
