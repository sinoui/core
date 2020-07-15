import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import 'jest-styled-components';
import adjustOpacity from '@sinoui/core/utils/adjustOpacity';
import WeekStatusBarWrapper from '../WeekStatusBarWrapper';

afterEach(cleanup);

it('实心圈', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <WeekStatusBarWrapper data-testid="week-status-bar" />
    </ThemeProvider>,
  );

  const weekStatusBar = getByTestId('week-status-bar');

  expect(weekStatusBar).toHaveStyleRule('position', 'absolute');
  expect(weekStatusBar).toHaveStyleRule('box-sizing', 'border-box');
  expect(weekStatusBar).toHaveStyleRule(
    'background-color',
    adjustOpacity(0.2, defaultTheme.palette.primary.main),
  );
});

it('空心圈', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <WeekStatusBarWrapper data-testid="week-status-bar" outlined />
    </ThemeProvider>,
  );

  const weekStatusBar = getByTestId('week-status-bar');

  expect(weekStatusBar).toHaveStyleRule(
    'border',
    `1px dashed rgba(0,0,0,0.25)`,
  );
});
