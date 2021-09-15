/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import SimpleMonthDatesView, { getDisabledDates } from './SimpleMonthDatesView';

afterEach(cleanup);

it('显示一个月的日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <SimpleMonthDatesView year={2020} month={5} data-testid="datesView" />
    </ThemeProvider>,
  );

  expect(getByTestId('datesView')).toHaveClass('sinoui-dates-view');
  expect(
    getByTestId('datesView').querySelectorAll('.sinoui-date-cell--empty')
      .length,
  ).toBe(0);
  expect(
    getByTestId('datesView').querySelectorAll('.sinoui-date-cell').length,
  ).toBe(30);

  const dateCell = getByTestId('datesView').querySelector(
    '.sinoui-date-cell:nth-child(2)',
  );
  expect(dateCell).toHaveAttribute('data-column', '2');
  expect(dateCell).toHaveAttribute('data-row', '1');
});

it('显示选中的日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <SimpleMonthDatesView
        year={2020}
        month={5}
        data-testid="datesView"
        value={[new Date(2020, 5, 2), new Date(2020, 5, 5)]}
      />
    </ThemeProvider>,
  );

  const selectedDateCells = getByTestId('datesView').querySelectorAll(
    '.sinoui-date-cell--selected',
  );
  expect(selectedDateCells.length).toBe(2);
  expect(selectedDateCells[0]).toHaveTextContent('2');
  expect(selectedDateCells[1]).toHaveTextContent('5');
});

it('禁用的日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <SimpleMonthDatesView
        year={2020}
        month={5}
        data-testid="datesView"
        minDate={new Date(2020, 5, 6)}
        maxDate={new Date(2020, 5, 28)}
      />
    </ThemeProvider>,
  );

  const disabledDates = getByTestId('datesView').querySelectorAll(
    '.sinoui-date-cell--disabled',
  );

  expect(disabledDates.length).toBe(8);
});

describe('getDisabledDates', () => {
  it('不指定可用区间，没有禁用日期', () => {
    expect(getDisabledDates(2020, 6)).toBeUndefined();
  });

  it('可用区间在指定月之前', () => {
    expect(getDisabledDates(2020, 6, undefined, new Date(2020, 5, 30))).toEqual(
      new Array(31).fill(0).map((_, index) => index + 1),
    );
  });

  it('可用区间在指定月之后', () => {
    expect(getDisabledDates(2020, 6, new Date(2020, 7, 30))).toEqual(
      new Array(31).fill(0).map((_, index) => index + 1),
    );
  });

  it('开始时间早于指定月，没有结束时间', () => {
    expect(getDisabledDates(2020, 6, new Date(2020, 4, 30))).toBeUndefined();
  });

  it('开始时间早于指定月，结束时间晚于指定月', () => {
    expect(
      getDisabledDates(2020, 6, new Date(2020, 4, 1), new Date(2020, 7, 1)),
    ).toBeUndefined();
  });

  it('开始时间为空，结束时间晚于指定月', () => {
    expect(
      getDisabledDates(2020, 6, undefined, new Date(2020, 7, 1)),
    ).toBeUndefined();
  });

  it('可用区间与指定月部分重叠', () => {
    expect(
      getDisabledDates(2020, 6, new Date(2020, 6, 3), new Date(2020, 6, 29)),
    ).toEqual([1, 2, 29, 30, 31]);
  });
});
