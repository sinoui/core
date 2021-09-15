/**
 * @jest-environment jsdom
 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import AppBar from '@sinoui/core/AppBar';
import { render } from '@testing-library/react';

/**
 * 顶部应用栏AppBar组件 单元测试
 */

describe('快照测试', () => {
  it('标准模式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <AppBar />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('突出模式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <AppBar prominent />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('密集模式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <AppBar dense />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('收缩模式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <AppBar dense />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('固定模式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <AppBar fixed />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it('className', () => {
  const { queryByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AppBar className="x-custom-app-bar" data-testid="appbar" />
    </ThemeProvider>,
  );

  expect(queryByTestId('appbar')).toHaveClass('x-custom-app-bar');
  expect(queryByTestId('appbar')).toHaveClass('sinoui-app-bar');
  expect(queryByTestId('appbar')).toHaveClass('sinoui-fixed');
});
