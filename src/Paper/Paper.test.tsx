import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Paper from './Paper';

it('正确渲Paper', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Paper />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染自定义阴影高度的Paper', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={4} />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染全宽模式下的Paper', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Paper fullWidth />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染显示圆角的Paper', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Paper square />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
