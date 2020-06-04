/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import CalendarView from '../CalendarView';

afterEach(cleanup);

it('展现日历视图', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        defaultYear={2020}
        defaultMonth={5}
        data-testid="calendar-view"
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(calendarView).toHaveTextContent('2020年六月');
});

it('上个月', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        defaultYear={2020}
        defaultMonth={5}
        data-testid="calendar-view"
      />
    </ThemeProvider>,
  );

  const prevButton = getByTestId('calendar-view').querySelector(
    '.sinoui-calendar-view-header__prev-month-icon',
  )!;

  act(() => {
    fireEvent.click(prevButton);
  });

  expect(getByTestId('calendar-view')).toHaveTextContent('2020年五月');
});

it('下个月', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        defaultYear={2020}
        defaultMonth={5}
        data-testid="calendar-view"
      />
    </ThemeProvider>,
  );

  const nextButton = getByTestId('calendar-view').querySelector(
    '.sinoui-calendar-view-header__next-month-icon',
  )!;

  act(() => {
    fireEvent.click(nextButton);
  });

  expect(getByTestId('calendar-view')).toHaveTextContent('2020年七月');
});
