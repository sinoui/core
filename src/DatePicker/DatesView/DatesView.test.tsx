/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import DatesView, { getRow, getColumn } from './DatesView';

afterEach(cleanup);

it('显示一个月的日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesView year={2020} month={5} data-testid="datesView" />
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

it('从星期日开始', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesView
        year={2020}
        month={5}
        data-testid="datesView"
        startOfWeek={0}
      />
    </ThemeProvider>,
  );

  expect(
    getByTestId('datesView').querySelectorAll('.sinoui-date-cell--empty')
      .length,
  ).toBe(1);
  expect(
    getByTestId('datesView').querySelectorAll(
      '.sinoui-date-cell:not(.sinoui-date-cell--empty)',
    ).length,
  ).toBe(30);
});

it('显示选中的日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesView
        year={2020}
        month={5}
        data-testid="datesView"
        selectedDates={[2, 5]}
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

it('指定轮廓日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesView
        year={2020}
        month={5}
        data-testid="datesView"
        outlinedDate={3}
      />
    </ThemeProvider>,
  );

  const selectedDateCells = getByTestId('datesView').querySelectorAll(
    '.sinoui-date-cell--outlined',
  );
  expect(selectedDateCells.length).toBe(1);
  expect(selectedDateCells[0]).toHaveTextContent('3');
});

it('获取指定日期所在的行数', () => {
  expect(getRow(10)).toBe(2);
  expect(getRow(1)).toBe(1);
});

it('获取指定日期所在的列号', () => {
  expect(getColumn(10)).toBe(3);
  expect(getColumn(1)).toBe(1);
  expect(getColumn(7)).toBe(7);
});

it('禁用的日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesView
        year={2020}
        month={5}
        data-testid="datesView"
        disabledDates={[1, 2, 3, 5, 9, 20]}
      />
    </ThemeProvider>,
  );

  const disabledDates = getByTestId('datesView').querySelectorAll(
    '.sinoui-date-cell--disabled',
  );

  expect(disabledDates.length).toBe(6);
});

it('显示下个月的部分日期，补全最后一个行', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesView
        year={2020}
        month={5}
        data-testid="datesView"
        showNextMonthDates
      />
    </ThemeProvider>,
  );

  const disabledDates = getByTestId('datesView').querySelectorAll(
    '.sinoui-date-cell--disabled',
  );

  expect(disabledDates.length).toBe(5);
  expect(
    getByTestId('datesView').querySelector('[data-date="2020-07-01"]'),
  ).toBeTruthy();
});

it('点击日期', () => {
  const onDateClick = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatesView
        year={2020}
        month={5}
        data-testid="datesView"
        onDateClick={onDateClick}
      />
    </ThemeProvider>,
  );

  const dateCell = getByTestId('datesView').querySelector(
    '.sinoui-date-cell:nth-child(2) > .sinoui-date-cell-content',
  );

  fireEvent.click(dateCell!);

  expect(onDateClick).toBeCalled();

  const date = onDateClick.mock.calls[0][1];

  expect(date.getFullYear()).toBe(2020);
  expect(date.getMonth()).toBe(5);
  expect(date.getDate()).toBe(2);
});
