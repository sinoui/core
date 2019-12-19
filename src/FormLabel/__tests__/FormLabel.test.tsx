import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import FormLabel from '../FormLabel';

it('正确渲染FormLabel', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormLabel>标签</FormLabel>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
