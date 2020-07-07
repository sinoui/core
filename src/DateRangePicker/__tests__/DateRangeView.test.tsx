/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import mem from '@sinoui/core/utils/mem';
import DateRangeView from '../DateRangeView';

const parseDate = mem((dateStr?: string) =>
  dateStr ? new Date(Date.parse(`${dateStr}T00:00:00`)) : undefined,
);

afterEach(cleanup);

describe('值与最大最小值', () => {
  it('指定选中日期', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeView
          startDate={parseDate('2020-06-14')}
          endDate={parseDate('2020-07-12')}
        />
      </ThemeProvider>,
    );

    expect(container.querySelector('[data-date="2020-06-14"]')).toHaveClass(
      'sinoui-date-cell--selected',
    );
    expect(container.querySelector('[data-date="2020-07-12"]')).toHaveClass(
      'sinoui-date-cell--selected',
    );
  });

  it('设置最大最小值', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeView
          defaultYear={2020}
          defaultMonth={5}
          minDate={parseDate('2020-06-14')}
          maxDate={parseDate('2020-07-12')}
        />
      </ThemeProvider>,
    );

    expect(container.querySelector('[data-date="2020-06-12"]')).toHaveClass(
      'sinoui-date-cell--disabled',
    );
    expect(container.querySelector('[data-date="2020-07-13"]')).toHaveClass(
      'sinoui-date-cell--disabled',
    );
  });

  it('不指定最大最小值的情况下，默认今天之前的日期不可选', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeView defaultYear={2020} defaultMonth={5} />
      </ThemeProvider>,
    );

    expect(container.querySelector('[data-date="2020-06-10"]')).toHaveClass(
      'sinoui-date-cell--disabled',
    );
  });

  it('点击某个日期,onDateClick被调用', () => {
    const onDateClick = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeView
          minDate={parseDate('2020-06-10')}
          startDate={parseDate('2020-06-14')}
          endDate={parseDate('2020-07-12')}
          onDateClick={onDateClick}
        />
      </ThemeProvider>,
    );

    fireEvent.click(
      container
        .querySelector('[data-date="2020-06-20"]')!
        .querySelector('.sinoui-date-cell-content')!,
    );

    expect(onDateClick).toBeCalled();
  });
});

it('鼠标悬浮进入不可用日期区域，此日期没有上下边框', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeView
        minDate={parseDate('2020-06-10')}
        startDate={parseDate('2020-06-14')}
        endDate={parseDate('2020-07-12')}
      />
    </ThemeProvider>,
  );

  const hoverDate = container
    .querySelector('[data-date="2020-06-08"]')!
    .querySelector('.sinoui-date-cell-content')!;

  fireEvent.mouseEnter(hoverDate);

  expect(
    container.querySelector('[data-date="2020-06-09"]')!,
  ).not.toHaveStyleRule('border-top', '1px dashed rgba(0,0,0,0.38)', {
    media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
    modifier: '::before',
  });
  expect(
    container.querySelector('[data-date="2020-06-09"]')!,
  ).not.toHaveStyleRule('border-bottom', '1px dashed rgba(0,0,0,0.38)', {
    media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
    modifier: '::before',
  });
});
