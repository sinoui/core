/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DateTimeView from '../DateTimeView';

afterEach(cleanup);

it('展现日期时间选择视图', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView date={new Date('2020-06-18')} hour={12} minute={20} />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view');

  expect(dateTimeView).toBeInTheDocument();
});

it('上个月', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView date={new Date('2020-06-18')} hour={12} minute={20} />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view');
  const prevButton = dateTimeView?.querySelector(
    '.sinoui-calendar-view-header__prev-month-icon',
  )!;

  act(() => {
    fireEvent.click(prevButton);
  });

  expect(dateTimeView).toHaveTextContent('2020年五月');
});

it('下个月', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView date={new Date('2020-06-18')} hour={12} minute={20} />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view');
  const nextButton = dateTimeView?.querySelector(
    '.sinoui-calendar-view-header__next-month-icon',
  )!;

  act(() => {
    fireEvent.click(nextButton);
  });

  expect(dateTimeView).toHaveTextContent('2020年七月');
});

it('年份选择视图', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView date={new Date('2020-06-18')} hour={12} minute={20} />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;

  const dropdown = dateTimeView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  fireEvent.click(dropdown);

  expect(
    dateTimeView.querySelector('.sinoui-date-time-view__yearsview'),
  ).toBeTruthy();
  expect(
    dateTimeView.querySelector('.sinoui-date-time-view__datesview'),
  ).toBeFalsy();
});

it('选择年份', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView
        date={new Date('2020-06-18')}
        hour={12}
        minute={20}
        skipMonthsView
      />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;

  const dropdown = dateTimeView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  fireEvent.click(dropdown);

  const year_2019 = dateTimeView.querySelector('[data-year="2019"]');
  fireEvent.click(year_2019!);

  expect(
    dateTimeView.querySelector('.sinoui-date-time-view__yearsview'),
  ).toBeFalsy();
  expect(dateTimeView).toHaveTextContent('2019年六月');
});

it('月份选择视图', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView date={new Date('2020-06-18')} hour={12} minute={20} isPc />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;

  const dropdown = dateTimeView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  act(() => {
    fireEvent.click(dropdown);
  });
  const year_2020 = dateTimeView.querySelector('[data-year="2020"]');
  act(() => {
    fireEvent.click(year_2020!);
  });

  expect(
    dateTimeView.querySelector('.sinoui-date-time-view__monthsview'),
  ).toBeTruthy();
});

it('选择月份', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView date={new Date('2020-06-18')} hour={12} minute={20} isPc />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;

  const dropdown = dateTimeView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  act(() => {
    fireEvent.click(dropdown);
  });
  const year_2020 = dateTimeView.querySelector('[data-year="2020"]');
  act(() => {
    fireEvent.click(year_2020!);
  });

  const month_7 = dateTimeView.querySelector('[data-month="7"]')!;
  fireEvent.click(month_7);

  expect(
    dateTimeView.querySelector('.sinoui-date-time-view__monthsview'),
  ).toBeFalsy();
  expect(dateTimeView).toHaveTextContent('2020年八月');
});

it('value', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView date={new Date('2020-06-18')} hour={12} minute={20} />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;
  expect(
    dateTimeView.querySelector('.sinoui-date-cell--selected'),
  ).toHaveTextContent('18');
  expect(
    dateTimeView.querySelectorAll('.sinoui-time-item--selected')[0],
  ).toHaveTextContent('12');
  expect(
    dateTimeView.querySelectorAll('.sinoui-time-item--selected')[1],
  ).toHaveTextContent('20');
});

it('onChange', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView
        date={new Date('2020-06-18')}
        hour={12}
        minute={20}
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;
  fireEvent.click(
    dateTimeView.querySelector(
      '[data-date="2020/6/24"] > .sinoui-date-cell-content',
    )!,
  );

  expect(onChange).toBeCalledWith('2020-06-24 12:20');
});

it('选择时间', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView
        date={new Date('2020-06-18')}
        hour={12}
        minute={20}
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const timeList = container.querySelector(
    '.sinoui-date-time-select__time-list',
  )!;

  act(() => {
    fireEvent.click(
      timeList
        .querySelector('.sinoui-date-time-select-view__hour-list')!
        .querySelector('[data-time-value="10"]')!,
    );
  });

  act(() => {
    fireEvent.click(
      timeList
        .querySelector('.sinoui-date-time-select-view__minute-list')!
        .querySelector('[data-time-value="25"]')!,
    );
  });

  expect(onChange).toBeCalledTimes(2);
});

it('minDate', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView
        date={new Date('2020-06-18')}
        hour={12}
        minute={20}
        minDate={new Date(2020, 5, 10, 12, 20)}
      />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;
  expect(
    dateTimeView.querySelectorAll('.sinoui-date-cell--disabled').length,
  ).toBe(9);
});

it('maxDate', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeView
        date={new Date('2020-06-18')}
        hour={12}
        minute={20}
        maxDate={new Date(2020, 5, 20, 12, 20)}
      />
    </ThemeProvider>,
  );

  const dateTimeView = container.querySelector('.sinoui-date-time-view')!;

  expect(
    dateTimeView.querySelectorAll('.sinoui-date-cell--disabled').length,
  ).toBe(11);
});
