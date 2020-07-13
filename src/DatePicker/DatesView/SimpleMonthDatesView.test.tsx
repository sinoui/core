import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import SimpleMonthDatesView from './SimpleMonthDatesView';

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
