import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import FormLabelContainer from '../FormLabelContainer';

it('正确渲染FormLabelContainer', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabelContainer>标签容器</FormLabelContainer>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('垂直布局的标签容器', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabelContainer vertical>标签容器</FormLabelContainer>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('带冒号的标签', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabelContainer align="right" colon>
          标签容器
        </FormLabelContainer>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
