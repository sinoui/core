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

it('年份选择视图', () => {
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
  const dropdown = calendarView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  fireEvent.click(dropdown);

  expect(
    calendarView.querySelector('.sinoui-calendar-view__yearsview'),
  ).toBeTruthy();
  expect(
    calendarView.querySelector('.sinoui-calendar-view__datesview'),
  ).toBeFalsy();
});

it('选择年份', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        defaultYear={2020}
        defaultMonth={5}
        data-testid="calendar-view"
        skipMonthsView
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');
  const dropdown = calendarView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  fireEvent.click(dropdown);

  const year_2019 = calendarView.querySelector('[data-year="2019"]');
  fireEvent.click(year_2019!);

  expect(
    calendarView.querySelector('.sinoui-calendar-view__yearsview'),
  ).toBeFalsy();
  expect(calendarView).toHaveTextContent('2019年六月');
});

it('选择选中的年份', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        defaultYear={2020}
        defaultMonth={5}
        data-testid="calendar-view"
        skipMonthsView
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');
  const dropdown = calendarView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  act(() => {
    fireEvent.click(dropdown);
  });

  const year_2020 = calendarView.querySelector('[data-year="2020"]');

  act(() => {
    fireEvent.click(year_2020!);
  });

  expect(
    calendarView.querySelector('.sinoui-calendar-view__yearsview'),
  ).toBeFalsy();
});

it('显示月份选择视图', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        defaultYear={2020}
        defaultMonth={5}
        data-testid="calendar-view"
        skipMonthsView={false}
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');
  const dropdown = calendarView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  act(() => {
    fireEvent.click(dropdown);
  });
  const year_2020 = calendarView.querySelector('[data-year="2020"]');
  act(() => {
    fireEvent.click(year_2020!);
  });

  expect(
    calendarView.querySelector('.sinoui-calendar-view__monthsview'),
  ).toBeTruthy();
});

it('选择月份', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        defaultYear={2020}
        defaultMonth={5}
        data-testid="calendar-view"
        skipMonthsView={false}
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');
  const dropdown = calendarView.querySelector(
    '.sinoui-calendar-view-header__year-dropdown-icon',
  )!;

  fireEvent.click(dropdown);
  const year_2020 = calendarView.querySelector('[data-year="2020"]');
  fireEvent.click(year_2020!);

  const month_7 = calendarView.querySelector('[data-month="7"]')!;
  fireEvent.click(month_7);

  expect(
    calendarView.querySelector('.sinoui-calendar-view__monthsview'),
  ).toBeFalsy();
  expect(calendarView).toHaveTextContent('2020年八月');
});

it('value', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView data-testid="calendar-view" value={new Date(2020, 4, 11)} />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(calendarView).toHaveTextContent('2020年五月');
  expect(
    calendarView.querySelector('.sinoui-date-cell--selected'),
  ).toHaveTextContent('11');
});

it('传递不同的value', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView data-testid="calendar-view" value={new Date(2020, 4, 11)} />
    </ThemeProvider>,
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView data-testid="calendar-view" value={new Date(2019, 7, 12)} />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(calendarView).toHaveTextContent('2019年八月');
  expect(
    calendarView.querySelector('.sinoui-date-cell--selected'),
  ).toHaveTextContent('12');
});

it('日期列表中不存在选中日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView data-testid="calendar-view" value={new Date(2020, 4, 11)} />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');
  const nextButton = calendarView.querySelector(
    '.sinoui-calendar-view-header__next-month-icon',
  )!;

  fireEvent.click(nextButton);

  expect(calendarView.querySelector('.sinoui-date-cell--selected')).toBeFalsy();
});

it('onChange', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        data-testid="calendar-view"
        value={new Date(2020, 4, 11)}
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');
  fireEvent.click(
    calendarView.querySelector(
      '[data-date="2020-05-15"] > .sinoui-date-cell-content',
    )!,
  );

  expect(onChange).toBeCalledWith(new Date(2020, 4, 15));
});

it('minDate', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        data-testid="calendar-view"
        value={new Date(2020, 4, 11, 0, 0, 0)}
        minDate={new Date(2020, 4, 10, 0, 0, 0)}
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(
    calendarView.querySelectorAll('.sinoui-date-cell--disabled').length,
  ).toBe(9);
});

it('maxDate', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        data-testid="calendar-view"
        value={new Date(2020, 4, 11, 0, 0, 0)}
        maxDate={new Date(2020, 4, 16, 0, 0, 0)}
      />
    </ThemeProvider>,
  );

  const calendarView = getByTestId('calendar-view');

  expect(
    calendarView.querySelectorAll('.sinoui-date-cell--disabled').length,
  ).toBe(16);
});

it('startOfWeek', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView
        data-testid="calendar-view"
        value={new Date(2020, 4, 11, 0, 0, 0)}
        startOfWeek={0}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('calendar-view')).toHaveTextContent('日一二三四五六');
  expect(
    getByTestId('calendar-view').querySelectorAll('.sinoui-date-cell--empty')
      .length,
  ).toBe(5);
});

it('ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarView data-testid="calendar-view" ref={ref} />
    </ThemeProvider>,
  );

  expect(ref.current).toBe(getByTestId('calendar-view'));
});
