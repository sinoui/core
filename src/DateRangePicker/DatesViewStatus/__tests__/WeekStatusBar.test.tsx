import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import WeekStatusBar from '../WeekStatusBar';

it('渲染实心周状态条', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <WeekStatusBar
        weekNo={1}
        startDate={new Date(2020, 6, 8)}
        endDate={new Date(2020, 6, 10)}
        data-testid="week-status-bar"
      />
    </ThemeProvider>,
  );

  const weekStatusBar = getByTestId('week-status-bar');
  expect(weekStatusBar).toHaveClass(
    'sinoui-date-range-picker__week-status-bar',
  );
  expect(weekStatusBar).toHaveClass(
    'sinoui-date-range-picker__week-status-bar--raised',
  );
  expect(weekStatusBar).toHaveAttribute('data-week-no', '1');
  expect(weekStatusBar).toHaveAttribute('data-start-date', '2020-07-08');
  expect(weekStatusBar).toHaveAttribute('data-end-date', '2020-07-10');
});

it('渲染空心周状态条', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <WeekStatusBar
        weekNo={1}
        startDate={new Date(2020, 6, 8)}
        endDate={new Date(2020, 6, 10)}
        data-testid="week-status-bar"
        outlined
      />
    </ThemeProvider>,
  );

  const weekStatusBar = getByTestId('week-status-bar');
  expect(weekStatusBar).toHaveClass(
    'sinoui-date-range-picker__week-status-bar--outlined',
  );
});

it('周从星期日开始', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <WeekStatusBar
        weekNo={1}
        startDate={new Date(2020, 6, 12)}
        endDate={new Date(2020, 6, 18)}
        data-testid="week-status-bar"
        startOfWeek={0}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('week-status-bar')).toHaveStyle(
    'width: calc(85.7143% + 28px)',
  );
  expect(getByTestId('week-status-bar')).toHaveStyle('left: calc(0% + 2px)');
});
