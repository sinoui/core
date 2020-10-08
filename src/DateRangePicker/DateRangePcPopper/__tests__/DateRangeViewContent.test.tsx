import { render, cleanup, act, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import DateRangeViewContent from '../DateRangeViewContent';

afterEach(cleanup);

jest.useFakeTimers();

it('鼠标悬停在2020-07-08', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewContent
        startDate={new Date(2020, 6, 20)}
        endDate={new Date(2020, 6, 23)}
        year={2020}
        month={6}
        focusedInput="start"
        data-testid="view-content"
      />
    </ThemeProvider>,
  );

  const viewContent = getByTestId('view-content');

  expect(viewContent).toHaveClass('sinoui-date-range-view__content');

  act(() => {
    fireEvent.mouseOver(
      viewContent.querySelector('[data-date="2020-07-08"]') as HTMLElement,
    );
  });

  expect(
    viewContent.querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--outlined',
    ).length,
  ).toBe(3);

  expect(
    viewContent.querySelector('.sinoui-date-range-picker__hover-outline'),
  ).toHaveAttribute('data-hover-date', '2020-07-08');
});

it('鼠标从日期单元格移到空白区域', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewContent
        startDate={new Date(2020, 6, 20)}
        endDate={new Date(2020, 6, 23)}
        year={2020}
        month={6}
        focusedInput="start"
        data-testid="view-content"
      />
    </ThemeProvider>,
  );

  const viewContent = getByTestId('view-content');

  act(() => {
    fireEvent.mouseOver(
      viewContent.querySelector('[data-date="2020-07-08"]') as HTMLElement,
    );
  });

  act(() => {
    fireEvent.mouseOver(viewContent);
    jest.runAllTimers();
  });

  expect(
    viewContent.querySelector('.sinoui-date-range-picker__hover-outline'),
  ).toBeFalsy();
  expect(
    viewContent.querySelector(
      '.sinoui-date-range-picker__week-status-bar--outlined',
    ),
  ).toBeFalsy();
});

it('鼠标从日期单元格移到不可用日期单元格', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewContent
        startDate={new Date(2020, 6, 20)}
        endDate={new Date(2020, 6, 23)}
        minDate={new Date(2020, 6, 8)}
        year={2020}
        month={6}
        focusedInput="start"
        data-testid="view-content"
      />
    </ThemeProvider>,
  );

  const viewContent = getByTestId('view-content');

  act(() => {
    fireEvent.mouseOver(
      viewContent.querySelector('[data-date="2020-07-08"]') as HTMLElement,
    );
  });

  act(() => {
    fireEvent.mouseOver(
      viewContent.querySelector('[data-date="2020-07-07"]') as HTMLElement,
    );
  });

  expect(
    viewContent.querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--outlined',
    ).length,
  ).toBe(3);

  expect(
    viewContent.querySelector('.sinoui-date-range-picker__hover-outline'),
  ).toHaveAttribute('data-hover-date', '2020-07-08');
});

it('显示跨年的两个日历', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewContent
        year={2020}
        month={11}
        focusedInput="start"
        data-testid="view-content"
      />
    </ThemeProvider>,
  );

  const views = getByTestId('view-content').querySelectorAll(
    '.sinoui-date-range-view__datesview',
  );
  expect(views[0]).toHaveAttribute('data-year', '2020');
  expect(views[0]).toHaveAttribute('data-month', '12');
  expect(views[1]).toHaveAttribute('data-year', '2021');
  expect(views[1]).toHaveAttribute('data-month', '1');
});

it('鼠标从日期单元格移出选择框', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewContent
        startDate={new Date(2020, 6, 20)}
        endDate={new Date(2020, 6, 23)}
        minDate={new Date(2020, 6, 8)}
        year={2020}
        month={6}
        focusedInput="start"
        data-testid="view-content"
      />
    </ThemeProvider>,
  );

  const viewContent = getByTestId('view-content');

  act(() => {
    fireEvent.mouseOver(
      viewContent.querySelector('[data-date="2020-07-08"]') as HTMLElement,
    );
  });

  act(() => {
    fireEvent.mouseLeave(viewContent);
    jest.runAllTimers();
  });

  expect(
    viewContent.querySelector('.sinoui-date-range-picker__hover-outline'),
  ).toBeFalsy();
});

it('鼠标短暂地从日期单元格移出选择框，然后又移到日期单元格上', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewContent
        startDate={new Date(2020, 6, 20)}
        endDate={new Date(2020, 6, 23)}
        minDate={new Date(2020, 6, 8)}
        year={2020}
        month={6}
        focusedInput="start"
        data-testid="view-content"
      />
    </ThemeProvider>,
  );

  const viewContent = getByTestId('view-content');

  act(() => {
    fireEvent.mouseOver(
      viewContent.querySelector('[data-date="2020-07-08"]') as HTMLElement,
    );
  });

  act(() => {
    fireEvent.mouseLeave(viewContent);
  });

  act(() => {
    fireEvent.mouseOver(
      viewContent.querySelector('[data-date="2020-07-08"]') as HTMLElement,
    );
  });

  expect(
    viewContent.querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--outlined',
    ).length,
  ).toBe(3);

  expect(
    viewContent.querySelector('.sinoui-date-range-picker__hover-outline'),
  ).toHaveAttribute('data-hover-date', '2020-07-08');
});

it('周从星期日开始', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewContent
        startDate={new Date(2021, 0, 1)}
        endDate={new Date(2021, 1, 31)}
        year={2021}
        month={1}
        focusedInput="start"
        data-testid="view-content"
        startOfWeek={0}
      />
    </ThemeProvider>,
  );

  const viewContent = getByTestId('view-content');

  expect(
    viewContent.querySelectorAll(
      '.sinoui-date-range-picker__week-status-bar--raised',
    ).length,
  ).toBe(6);
});
