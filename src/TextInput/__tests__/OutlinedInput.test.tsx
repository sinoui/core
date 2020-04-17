import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import OutlinedInput from '../OutlinedInput';

it('正确渲染边框模式下的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下边框模式的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput disabled />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染错误状态下边框模式的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput error="错误提示" notched />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('聚焦状态', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput focused />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('无标签', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput noLabel />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染密集状态下边框模式的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <>
          <OutlinedInput dense />
          <OutlinedInput dense noLabel />
        </>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
