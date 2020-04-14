import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import NativeSelectInput from '../NativeSelectInput';

it('渲染原生选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <NativeSelectInput>
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
        </NativeSelectInput>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <NativeSelectInput disabled>
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
        </NativeSelectInput>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染多选选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <NativeSelectInput multiple>
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
        </NativeSelectInput>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
