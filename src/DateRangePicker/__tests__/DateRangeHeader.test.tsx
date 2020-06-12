/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import DateRangeHeader from '../DateRangeHeader';

afterEach(cleanup);

it('渲染日历视图头部', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeHeader
        startYear={2020}
        startMonth={5}
        data-testid="date-range-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('date-range-header');

  expect(header).toHaveTextContent('2020年六月2020年七月');
});

it('上个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeHeader
        startYear={2020}
        startMonth={5}
        data-testid="date-range-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('date-range-header');
  const prevButton = header.querySelector(
    '.sinoui-date-range-picker-header__prev-month-icon',
  );

  fireEvent.click(prevButton!);

  expect(onChange).toBeCalledWith(2020, 4);
});

it('跨年切换上个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeHeader
        startYear={2020}
        startMonth={0}
        data-testid="date-range-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('date-range-header');
  const prevButton = header.querySelector(
    '.sinoui-date-range-picker-header__prev-month-icon',
  );

  fireEvent.click(prevButton!);

  expect(onChange).toBeCalledWith(2019, 11);
});

it('下个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeHeader
        startYear={2020}
        startMonth={5}
        data-testid="date-range-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('date-range-header');
  const nextButton = header.querySelector(
    '.sinoui-date-range-picker-header__next-month-icon',
  );

  fireEvent.click(nextButton!);

  expect(onChange).toBeCalledWith(2020, 6);
});

it('跨年切换下个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeHeader
        startYear={2020}
        startMonth={11}
        data-testid="date-range-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('date-range-header');
  const nextButton = header.querySelector(
    '.sinoui-date-range-picker-header__next-month-icon',
  );

  fireEvent.click(nextButton!);

  expect(onChange).toBeCalledWith(2021, 0);
});
