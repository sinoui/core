import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import Label from './Label';

it('正确渲染Label组件', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Label>标签内容</Label>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染必填状态下的Label', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Label required>标签内容</Label>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染错误状态下的Label', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Label error>标签内容</Label>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下的Label', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Label disabled>标签内容</Label>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染获取焦点状态下的Label', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Label focused>标签内容</Label>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染警告状态下的Label', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Label warning>标签内容</Label>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
