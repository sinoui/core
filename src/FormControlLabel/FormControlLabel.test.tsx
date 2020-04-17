import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import FormControlLabel from './FormControlLabel';
import Button from '../Button';

it('正确渲染FormControLabel', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FormControlLabel label="复选框" control={<Button />} />
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});
