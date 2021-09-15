/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import formatDate from '@sinoui/core/DatePicker/formatDate';
import DateRangeDatesView from '../DateRangeDatesView';

afterEach(cleanup);

describe('展示选中日期', () => {
  it('展示开始日期', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeDatesView
          startDate={new Date(2020, 7, 1)}
          year={2020}
          month={7}
          data-testid="datesview"
        />
      </ThemeProvider>,
    );

    const datesView = getByTestId('datesview');
    const selectedDateCell = datesView.querySelector(
      '.sinoui-date-cell--selected',
    ) as HTMLElement;

    expect(selectedDateCell).toHaveAttribute('data-date', '2020-08-01');
  });

  it('展示结束日期', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeDatesView
          endDate={new Date(2020, 7, 2)}
          year={2020}
          month={7}
          data-testid="datesview"
        />
      </ThemeProvider>,
    );

    const datesView = getByTestId('datesview');
    const selectedDateCell = datesView.querySelector(
      '.sinoui-date-cell--selected',
    ) as HTMLElement;

    expect(selectedDateCell).toHaveAttribute('data-date', '2020-08-02');
  });

  it('同时展示开始日期和结束日期', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeDatesView
          startDate={new Date(2020, 7, 1)}
          endDate={new Date(2020, 7, 2)}
          year={2020}
          month={7}
          data-testid="datesview"
        />
      </ThemeProvider>,
    );

    const datesView = getByTestId('datesview');
    const selectedDateCells = datesView.querySelectorAll(
      '.sinoui-date-cell--selected',
    );

    expect(selectedDateCells[0]).toHaveAttribute('data-date', '2020-08-01');
    expect(selectedDateCells[1]).toHaveAttribute('data-date', '2020-08-02');
  });

  it('开始日期不在指定月月', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeDatesView
          startDate={new Date(2020, 6, 1)}
          year={2020}
          month={7}
          data-testid="datesview"
        />
      </ThemeProvider>,
    );

    const datesView = getByTestId('datesview');

    expect(
      datesView.querySelectorAll('.sinoui-date-cell--selected').length,
    ).toBe(0);
  });

  it('结束日期不在指定月月', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeDatesView
          endDate={new Date(2020, 6, 1)}
          year={2020}
          month={7}
          data-testid="datesview"
        />
      </ThemeProvider>,
    );

    const datesView = getByTestId('datesview');

    expect(
      datesView.querySelectorAll('.sinoui-date-cell--selected').length,
    ).toBe(0);
  });

  it('没有开始日期和结束日期', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeDatesView year={2020} month={7} data-testid="datesview" />
      </ThemeProvider>,
    );

    const datesView = getByTestId('datesview');

    expect(
      datesView.querySelectorAll('.sinoui-date-cell--selected').length,
    ).toBe(0);
  });
});

it('className和元数据', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeDatesView year={2020} month={7} data-testid="datesview" />
    </ThemeProvider>,
  );

  expect(getByTestId('datesview')).toHaveClass(
    'sinoui-date-range-view__datesview',
  );
  expect(getByTestId('datesview')).toHaveAttribute('data-year', '2020');
  expect(getByTestId('datesview')).toHaveAttribute('data-month', '8');
});

it('显示选中区间的状态条', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeDatesView
        year={2020}
        month={7}
        startDate={new Date(2020, 7, 3)}
        endDate={new Date(2020, 7, 5)}
        data-testid="datesview"
      />
    </ThemeProvider>,
  );

  expect(
    getByTestId('datesview').querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--raised',
    ).length,
  ).toBe(1);
});

it('显示预选中区间的状态条', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeDatesView
        year={2020}
        month={7}
        outlinedDateRange={[new Date(2020, 7, 1), new Date(2020, 7, 3)]}
        data-testid="datesview"
      />
    </ThemeProvider>,
  );

  expect(
    getByTestId('datesview').querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--outlined',
    ).length,
  ).toBe(2);
});

it('显示今日', () => {
  const today = new Date();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeDatesView
        year={today.getFullYear()}
        month={today.getMonth()}
        data-testid="datesview"
        showToday
      />
    </ThemeProvider>,
  );

  expect(
    getByTestId('datesview').querySelector('.sinoui-date-cell--outlined'),
  ).toHaveAttribute('data-date', formatDate(today));
});

it('不显示今日', () => {
  const today = new Date();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeDatesView
        year={today.getFullYear()}
        month={today.getMonth()}
        data-testid="datesview"
        showToday={false}
      />
    </ThemeProvider>,
  );

  expect(
    getByTestId('datesview').querySelector('.sinoui-date-cell--outlined'),
  ).toBeFalsy();
});

it('星期从周日开始', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeDatesView
        startDate={new Date(2021, 0, 1)}
        endDate={new Date(2021, 1, 31)}
        year={2021}
        month={0}
        data-testid="datesview"
        startOfWeek={0}
      />
    </ThemeProvider>,
  );

  const datesView = getByTestId('datesview');

  expect(
    datesView.querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--raised',
    ).length,
  ).toBe(6);
});
