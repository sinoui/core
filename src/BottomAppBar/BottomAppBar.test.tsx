import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import BottomAppBar from '@sinoui/core/BottomAppBar';
import InSetCircle from './InSetCircle';

/**
 * 底部应用栏BottomAppBar组件 单元测试
 */

describe('快照测试', () => {
  it('默认', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <BottomAppBar />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('浮动按钮居右显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <BottomAppBar endFab />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('浮动按钮居中嵌入', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <BottomAppBar insertFab />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('嵌入图标', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <InSetCircle />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
