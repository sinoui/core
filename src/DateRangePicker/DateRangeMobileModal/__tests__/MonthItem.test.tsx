/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import mem from '@sinoui/core/utils/mem';
import MonthItem from '../MonthItem';
import { genYears } from '../MobileDateRangeView';

const parseDate = mem((dateStr?: string) =>
  dateStr ? new Date(Date.parse(`${dateStr}T00:00:00`)) : undefined,
);

const years = genYears();

afterEach(cleanup);

it('指定选中日期', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <MonthItem
        index={1205}
        data={{
          showToday: true,
          years,
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
          years,
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
          years,
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
