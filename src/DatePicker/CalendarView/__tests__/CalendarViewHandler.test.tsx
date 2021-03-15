/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import CalendarViewHeader from '../CalendarViewHeader';
import ViewModel from '../../ViewModel';

afterEach(cleanup);

it('渲染日历视图头部', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');

  expect(header).toHaveTextContent('2020年六月');
});

it('上个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
        viewModel={ViewModel.dates}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');
  const prevButton = header.querySelector(
    '.sinoui-calendar-view-header__prev-month-icon',
  );

  fireEvent.click(prevButton!);

  expect(onChange).toBeCalledWith(2020, 4);
});

it('下个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
        viewModel={ViewModel.dates}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');
  const nextButton = header.querySelector(
    '.sinoui-calendar-view-header__next-month-icon',
  );

  fireEvent.click(nextButton!);

  expect(onChange).toBeCalledWith(2020, 6);
});

it('viewModel = years', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
        viewModel={ViewModel.years}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');

  expect(header).toHaveStyleRule('transform', 'rotate( 180deg )', {
    modifier: '.sinoui-calendar-view-header__year-dropdown-icon',
  });
  expect(
    header.querySelector('.sinoui-calendar-view-header__prev-month-icon'),
  ).toBeFalsy();
  expect(
    header.querySelector('.sinoui-calendar-view-header__next-month-icon'),
  ).toBeFalsy();
});

it('点击切换年份视图的按钮', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
        viewModel={ViewModel.years}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');
  const dropdown = header.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  );

  fireEvent.click(dropdown!);
  // 没有指定onViewModelChange，没有报错
});

it('点击切换年份视图的按钮，回调onViewModelChange', () => {
  const onChange = jest.fn();
  const onViewModelChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
        viewModel={ViewModel.years}
        onViewModelChange={onViewModelChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');
  const dropdown = header.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  );

  fireEvent.click(dropdown!);

  expect(onViewModelChange).toBeCalledWith(ViewModel.dates);
});

it('在日历视图时，点击切换年份视图的按钮，回调onViewModelChange', () => {
  const onChange = jest.fn();
  const onViewModelChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
        onViewModelChange={onViewModelChange}
        viewModel={ViewModel.dates}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');
  const dropdown = header.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  );

  fireEvent.click(dropdown!);

  expect(onViewModelChange).toBeCalledWith(ViewModel.years);
});
