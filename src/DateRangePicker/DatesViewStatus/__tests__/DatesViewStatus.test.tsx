import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import DatesViewStatus from '../DatesViewStatus';

afterEach(cleanup);

it('选中的日期区间在第二周和第三周', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesViewStatus
        startDate={new Date(2020, 6, 8)}
        endDate={new Date(2020, 6, 16)}
        year={2020}
        month={6}
      />
    </ThemeProvider>,
  );

  const weekStatusBars = container.querySelectorAll(
    '.sinoui-date-range-picker__week-status-bar',
  );

  expect(weekStatusBars.length).toBe(2);

  // 第二周的状态条
  expect(weekStatusBars[0]).toHaveAttribute('data-week-no', '1');
  expect(weekStatusBars[0]).toHaveAttribute('data-start-date', '2020-07-08');
  expect(weekStatusBars[0]).toHaveAttribute('data-end-date', '2020-07-12');

  // 第三周的状态条
  expect(weekStatusBars[1]).toHaveAttribute('data-week-no', '2');
  expect(weekStatusBars[1]).toHaveAttribute('data-start-date', '2020-07-13');
  expect(weekStatusBars[1]).toHaveAttribute('data-end-date', '2020-07-16');
});

it('选中区间不在指定月份', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesViewStatus
        startDate={new Date(2020, 6, 8)}
        endDate={new Date(2020, 6, 16)}
        year={2020}
        month={7}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelectorAll('.sinoui-date-range-picker__week-status-bar')
      .length,
  ).toBe(0);
});

it('渲染空心圈', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesViewStatus
        startDate={new Date(2020, 6, 8)}
        endDate={new Date(2020, 6, 16)}
        year={2020}
        month={6}
        outlined
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--outlined',
    ).length,
  ).toBe(2);
});
