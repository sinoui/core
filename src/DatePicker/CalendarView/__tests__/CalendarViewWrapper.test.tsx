/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import CalendarViewWrapper from '../CalendarViewWrapper';

afterEach(cleanup);

it('展现日历视图容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewWrapper data-testid="calendar-view" $isPc />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(calendarView).toHaveStyleRule('width', '256px');
  expect(calendarView).toHaveStyleRule('padding', '0 16px 12px', {
    modifier: '.sinoui-week-title-bar',
  });
  expect(calendarView).toHaveStyleRule('padding', '0 16px 8px', {
    modifier: '.sinoui-calendar-view__datesview',
  });
  expect(calendarView).toHaveStyleRule('height', '192px', {
    modifier: '.sinoui-calendar-view__datesview',
  });
});

it('阻止in属性', () => {
  const Comp = CalendarViewWrapper as any;
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Comp data-testid="calendar-view" in />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(calendarView).not.toHaveAttribute('in');
});

it('移动端日历视图容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewWrapper data-testid="calendar-view" $isPc={false} />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(calendarView).toHaveStyleRule('width', '328px');
  expect(calendarView).toHaveStyleRule('padding', '0 12px', {
    modifier: '.sinoui-week-title-bar',
  });
  expect(calendarView).toHaveStyleRule('padding', '0 12px', {
    modifier: '.sinoui-calendar-view__datesview',
  });
  expect(calendarView).toHaveStyleRule('height', '240px', {
    modifier: '.sinoui-calendar-view__datesview',
  });
});
