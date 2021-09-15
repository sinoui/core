/**
 * @jest-environment jsdom
 */
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, cleanup } from '@testing-library/react';
import InputAdornment from './InputAdornment';

afterEach(cleanup);

it('在开始位置使用', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <InputAdornment position="start">
          <p>装饰器</p>
        </InputAdornment>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('在结束位置使用', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <InputAdornment position="end">
          <p>装饰器</p>
        </InputAdornment>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('显示文本装饰器', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <InputAdornment position="end">装饰器</InputAdornment>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('文本装饰器的className', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <InputAdornment data-testid="adornment" position="end">
        文本
      </InputAdornment>
    </ThemeProvider>,
  );

  expect(getByTestId('adornment')).toHaveClass('sinoui-input-adornment--text');
});

it('禁止点击事件', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <InputAdornment position="start" disablePointerEvents>
          <p>装饰器</p>
        </InputAdornment>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('替换根元素', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <InputAdornment position="start" as="p">
          <p>装饰器</p>
        </InputAdornment>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('className', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <InputAdornment
        data-testid="adornment"
        className="x-input-adornment"
        position="start"
      >
        装饰器
      </InputAdornment>
    </ThemeProvider>,
  );

  expect(getByTestId('adornment')).toHaveClass('x-input-adornment');
});
