import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { Row, Column } from '@sinoui/core/Grid';
import {
  GridDemo,
  GridDemo36,
  GridDemoResponse,
  GridColumnWidth,
  GridColumnWidthAuto,
} from './gridDemo';
export default {
  title: 'Grid',
};

export const 默认 = () => <GridDemo />;

export const 默认两边不留白 = () => <GridDemo gutter={8} />;

export const 两边留白 = () => <GridDemo gutterType="around" gutter={8} />;

export const 项目在水平方向居右对齐 = () => (
  <GridDemo36 gutterType="around" gutter={8} justifyContent="flex-end" />
);

export const 响应式布局 = () => <GridDemoResponse gutter={8} />;

export const 某列固定宽度 = () => <GridColumnWidth gutter={8} />;
export const 自动布局 = () => <GridColumnWidthAuto gutter={8} />;
