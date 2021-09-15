import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Arrow from '../Arrow';

it('ToolTipContent', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Arrow />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
