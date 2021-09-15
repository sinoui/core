import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import TooltipContent from '../TooltipContent';

it('ToolTipContent', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <TooltipContent />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
