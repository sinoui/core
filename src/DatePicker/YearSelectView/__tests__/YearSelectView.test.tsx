import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';
import YearSelectView, { calcStartYear, genYears } from '../YearSelectView';

afterEach(cleanup);

it('渲染年份选择视图', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearSelectView selectedYear={2020} data-testid="year-select-view" />
    </ThemeProvider>,
  );

  const yearSelectView = getByTestId('year-select-view');
  expect(yearSelectView).toHaveTextContent('1920');
  expect(yearSelectView).toHaveTextContent('2119');
  expect(
    yearSelectView.querySelector(
      '.sinoui-year-select-view__year-item--selected',
    ),
  ).toHaveTextContent('2020');
  expect(
    yearSelectView.querySelectorAll('.sinoui-year-select-view__year-item')
      .length,
  ).toBe(200);
});

it('计算开始年份', () => {
  expect(calcStartYear(2020, 3)).toBe(1920);
  expect(calcStartYear(2020, 4)).toBe(1920);

  expect(calcStartYear(2019, 3)).toBe(1920);
  expect(calcStartYear(2019, 4)).toBe(1916);
});

it('产生年份列表', () => {
  expect(genYears(2020, 200).length).toBe(200);
});

it('指定最小年份', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearSelectView
        selectedYear={2020}
        data-testid="year-select-view"
        minYear={2019}
      />
    </ThemeProvider>,
  );

  expect(
    getByTestId('year-select-view').querySelectorAll(
      '.sinoui-year-select-view__year-item--disabled',
    ).length,
  ).toBe(99);
});

it('指定最大年份', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearSelectView
        selectedYear={2020}
        data-testid="year-select-view"
        maxYear={2021}
      />
    </ThemeProvider>,
  );

  expect(
    getByTestId('year-select-view').querySelectorAll(
      '.sinoui-year-select-view__year-item--disabled',
    ).length,
  ).toBe(98);
});

it('指定选项个数', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearSelectView
        selectedYear={2020}
        data-testid="year-select-view"
        showYearsCount={20}
      />
    </ThemeProvider>,
  );

  const yearSelectView = getByTestId('year-select-view');
  expect(
    yearSelectView.querySelectorAll('.sinoui-year-select-view__year-item')
      .length,
  ).toBe(20);
  expect(yearSelectView).toHaveTextContent('2029');
});

it('监听年份选择', () => {
  const onYearSelect = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearSelectView
        selectedYear={2020}
        data-testid="year-select-view"
        onYearSelect={onYearSelect}
      />
    </ThemeProvider>,
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const yearItem = getByTestId('year-select-view').querySelector(
    '[data-year="2019"]',
  )!;

  fireEvent.click(yearItem);

  expect(onYearSelect).toBeCalledWith(2019);
});
