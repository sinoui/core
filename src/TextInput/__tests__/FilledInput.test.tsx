import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import FilledInput from '../FilledInput';

it('正确渲染填充模式的input', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FilledInput />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下的填充模式的Input', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FilledInput disabled />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染错误状态下填充模式的Input', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FilledInput error />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('聚焦状态', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FilledInput focused />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('无标签', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FilledInput noLabel />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('密集模式', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <>
          <FilledInput dense />
          <FilledInput dense noLabel />
        </>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
