/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import mem from '@sinoui/core/utils/mem';
import MonthItem from '../MonthItem';

const parseDate = mem((dateStr?: string) =>
  dateStr ? new Date(Date.parse(`${dateStr}T00:00:00`)) : undefined,
);

const defaultYear = 2020;

afterEach(cleanup);

it('指定选中日期', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <MonthItem
        index={1205}
        data={{
          showToday: true,
          defaultYear,
          startDate: parseDate('2020-06-14'),
          endDate: parseDate('2020-06-20'),
        }}
      />
    </ThemeProvider>,
  );

  expect(container.querySelector('[data-date="2020-06-14"]')).toHaveClass(
    'sinoui-date-cell--selected',
  );
  expect(container.querySelector('[data-date="2020-06-20"]')).toHaveClass(
    'sinoui-date-cell--selected',
  );
});

it('指定最大最小值', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <MonthItem
        index={1205}
        data={{
          showToday: true,
          defaultYear,
          minDate: parseDate('2020-06-14'),
          maxDate: parseDate('2020-06-20'),
        }}
      />
    </ThemeProvider>,
  );

  expect(container.querySelector('[data-date="2020-06-12"]')).toHaveClass(
    'sinoui-date-cell--disabled',
  );
  expect(container.querySelector('[data-date="2020-06-22"]')).toHaveClass(
    'sinoui-date-cell--disabled',
  );
});

it('点击某一日期，onDateClick被调用', () => {
  const onDateClick = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <MonthItem
        index={1205}
        data={{
          showToday: true,
          defaultYear,
          minDate: parseDate('2020-06-14'),
          maxDate: parseDate('2020-06-20'),
          onDateClick,
        }}
      />
    </ThemeProvider>,
  );
  fireEvent.click(
    container
      .querySelector('[data-date="2020-06-16"]')!
      .querySelector('.sinoui-date-cell-content')!,
  );
  expect(onDateClick).toBeCalled();
});

it('展示年份和月份信息,比如2020年六月', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <MonthItem
        index={1205}
        data={{
          showToday: true,
          defaultYear,
        }}
      />
    </ThemeProvider>,
  );

  expect(getByText('2020年六月')).toBeInTheDocument();
});

it('展示选中状态条', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <MonthItem
        index={1205}
        data={{
          showToday: true,
          defaultYear,
          startDate: parseDate('2020-06-14'),
          endDate: parseDate('2020-06-20'),
        }}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--raised',
    ),
  ).toHaveLength(2);
});
