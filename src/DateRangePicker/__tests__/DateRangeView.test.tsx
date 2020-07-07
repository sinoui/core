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

describe('开始日期和结束日期都存在，鼠标悬浮进入晚于结束时间的日期', () => {
  it('日期会有实线圆框', () => {
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
      .querySelector('[data-date="2020-07-20"]')!
      .querySelector('.sinoui-date-cell-content')!;

    fireEvent.mouseEnter(hoverDate);

    expect(hoverDate).toHaveStyleRule('border', '1px solid rgba(0,0,0,0.38)', {
      modifier: ':hover',
    });

    fireEvent.mouseLeave(hoverDate);
  });

  it('该日期上下边框样式右侧有圆角', () => {
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
      .querySelector('[data-date="2020-07-20"]')!
      .querySelector('.sinoui-date-cell-content')!;

    fireEvent.mouseEnter(hoverDate);

    expect(
      container.querySelector('[data-date="2020-07-20"]')!,
    ).toHaveStyleRule('border-top-right-radius', '50%', {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::before',
    });
    expect(
      container.querySelector('[data-date="2020-07-20"]')!,
    ).toHaveStyleRule('border-bottom-right-radius', '50%', {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::before',
    });
  });

  it('结束日期会有::after元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangeView
          minDate={parseDate('2020-06-10')}
          startDate={parseDate('2020-06-16')}
          endDate={parseDate('2020-07-14')}
        />
      </ThemeProvider>,
    );

    const hoverDate = container
      .querySelector('[data-date="2020-07-20"]')!
      .querySelector('.sinoui-date-cell-content')!;

    fireEvent.mouseEnter(hoverDate);

    expect(
      container.querySelector('[data-date="2020-07-14"]')!,
    ).toHaveStyleRule('border-top', '1px dashed rgba(0,0,0,0.38)', {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::after',
    });
  });
});

it('鼠标悬浮某个早于开始日期的日期，该日期会有实线圆框', () => {
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
    .querySelector('[data-date="2020-06-12"]')!
    .querySelector('.sinoui-date-cell-content')!;

  fireEvent.mouseEnter(hoverDate);

  expect(hoverDate).toHaveStyleRule('border', '1px solid rgba(0,0,0,0.38)', {
    modifier: ':hover',
  });
});

it('鼠标悬浮在某个开始时间和结束时间之间的日期，该日期不会有实线圆框', () => {
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
    .querySelector('[data-date="2020-06-20"]')!
    .querySelector('.sinoui-date-cell-content')!;

  fireEvent.mouseEnter(hoverDate);

  expect(hoverDate).not.toHaveStyleRule('border', '1px solid currentColor', {
    modifier: ':hover',
  });
});

it('只有开始日期时，鼠标移入开始日期之后的任意日期，开始日期和该日期之间的日期有上下边框', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeView
        minDate={parseDate('2020-06-10')}
        startDate={parseDate('2020-06-14')}
      />
    </ThemeProvider>,
  );

  const hoverDate = container
    .querySelector('[data-date="2020-06-26"]')!
    .querySelector('.sinoui-date-cell-content')!;

  fireEvent.mouseEnter(hoverDate);

  expect(container.querySelector('[data-date="2020-06-20"]')!).toHaveStyleRule(
    'border-top',
    '1px dashed rgba(0,0,0,0.38)',
    {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::before',
    },
  );
  expect(container.querySelector('[data-date="2020-06-20"]')!).toHaveStyleRule(
    'border-bottom',
    '1px dashed rgba(0,0,0,0.38)',
    {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::before',
    },
  );
});

it('只有开始日期时，鼠标悬浮进入晚于开始时间的日期，开始日期应该有::after元素', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeView
        minDate={parseDate('2020-06-10')}
        startDate={parseDate('2020-06-16')}
      />
    </ThemeProvider>,
  );

  const hoverDate = container
    .querySelector('[data-date="2020-06-20"]')!
    .querySelector('.sinoui-date-cell-content')!;

  fireEvent.mouseEnter(hoverDate);

  expect(container.querySelector('[data-date="2020-06-16"]')!).toHaveStyleRule(
    'border-top',
    '1px dashed rgba(0,0,0,0.38)',
    {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::after',
    },
  );
});

it('只有结束日期时，鼠标移动到早于结束时间的日期上时，该日期与结束日期之间的日期有上下边框', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeView
        defaultYear={2020}
        defaultMonth={5}
        minDate={parseDate('2020-06-10')}
        endDate={parseDate('2020-07-14')}
      />
    </ThemeProvider>,
  );

  const hoverDate = container
    .querySelector('[data-date="2020-06-20"]')!
    .querySelector('.sinoui-date-cell-content')!;

  fireEvent.mouseEnter(hoverDate);

  expect(container.querySelector('[data-date="2020-06-26"]')!).toHaveStyleRule(
    'border-top',
    '1px dashed rgba(0,0,0,0.38)',
    {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::before',
    },
  );
});

it('指定开始时间和结束时间,鼠标悬浮在开始时间之前的任一日期，开始时间的前一天有::after元素', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeView
        minDate={parseDate('2020-06-10')}
        startDate={parseDate('2020-06-16')}
        endDate={parseDate('2020-07-10')}
      />
    </ThemeProvider>,
  );

  fireEvent.mouseEnter(
    container
      .querySelector('[data-date="2020-06-13"]')!
      .querySelector('.sinoui-date-cell-content')!,
  );

  const prevStartDay = container.querySelector('[data-date="2020-06-15"]')!;

  expect(prevStartDay).toHaveStyleRule(
    'border-top',
    '1px dashed rgba(0,0,0,0.38)',
    {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::after',
    },
  );
});

it('只有结束时间，鼠标悬浮进入早于结束时间之前的日期，结束日期的前一天有::after元素', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeView
        defaultYear={2020}
        defaultMonth={5}
        minDate={parseDate('2020-06-10')}
        endDate={parseDate('2020-07-10')}
      />
    </ThemeProvider>,
  );

  fireEvent.mouseEnter(
    container
      .querySelector('[data-date="2020-06-13"]')!
      .querySelector('.sinoui-date-cell-content')!,
  );

  const prevStartDay = container.querySelector('[data-date="2020-07-09"]')!;

  expect(prevStartDay).toHaveStyleRule(
    'border-top',
    '1px dashed rgba(0,0,0,0.38)',
    {
      media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
      modifier: '::after',
    },
  );
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
