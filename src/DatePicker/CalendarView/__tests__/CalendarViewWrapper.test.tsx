/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import CalendarViewWrapper from '../CalendarViewWrapper';

afterEach(cleanup);

it('展现日历视图容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewWrapper data-testid="calendar-view" />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(calendarView).toHaveStyleRule('width', '328px');
  expect(calendarView).toHaveStyleRule('padding', '0 12px', {
    modifier: '.sinoui-week-title-bar',
  });
  expect(calendarView).toHaveStyleRule('padding', '0 12px 8px', {
    modifier: '.sinoui-calendar-view__datesview',
  });
  expect(calendarView).toHaveStyleRule('height', '240px', {
    modifier: '.sinoui-calendar-view__datesview',
  });

  expect(calendarView).toHaveStyleRule('width', '256px', {
    media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
  });
  expect(calendarView).toHaveStyleRule('padding', '0 16px 12px', {
    modifier: '.sinoui-week-title-bar',
    media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
  });
  expect(calendarView).toHaveStyleRule('padding', '0 16px 8px', {
    modifier: '.sinoui-calendar-view__datesview',
    media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
  });
  expect(calendarView).toHaveStyleRule('height', '192px', {
    modifier: '.sinoui-calendar-view__datesview',
    media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
  });
});
