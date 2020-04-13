import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import Input from '../Input';

it('正确渲染input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Input />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Input disabled />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染错误状态下的input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Input error />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染密集模式下的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Input dense />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
