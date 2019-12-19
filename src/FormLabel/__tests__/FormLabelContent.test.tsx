import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import FormLabelContent from '../FormLabelContent';

it('正确渲染FormLabelContent组件', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabelContent>标签内容</FormLabelContent>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染垂直布局下的标签内容', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabelContent vertical>标签内容</FormLabelContent>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('两端对齐的渲染方式', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabelContent align="justify" required>
          标签内容
        </FormLabelContent>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染右对齐的必填状态', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabelContent align="right" required>
          标签内容
        </FormLabelContent>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
