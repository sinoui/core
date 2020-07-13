/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import mem from '@sinoui/core/utils/mem';
import MobileDateRangeView from '../MobileDateRangeView';

const parseDate = mem((dateStr?: string) =>
  dateStr ? new Date(Date.parse(`${dateStr}T00:00:00`)) : undefined,
);

afterEach(cleanup);

describe('值与最大最小值', () => {
  it('指定选中日期', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeView
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
        <MobileDateRangeView
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

  it('点击某个日期,该日期被选中', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeView
          minDate={parseDate('2020-06-10')}
          startDate={parseDate('2020-06-14')}
          endDate={parseDate('2020-07-12')}
        />
      </ThemeProvider>,
    );

    fireEvent.click(
      container
        .querySelector('[data-date="2020-06-20"]')!
        .querySelector('.sinoui-date-cell-content')!,
    );

    expect(container.querySelector('[data-date="2020-06-20"]')).toHaveClass(
      'sinoui-date-cell--selected',
    );
  });
});

it('点击保存按钮，onChange被调用', () => {
  const onChange = jest.fn();
  const { container, getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <MobileDateRangeView
        defaultYear={2020}
        defaultMonth={5}
        minDate={parseDate('2020-06-10')}
        endDate={parseDate('2020-07-12')}
        focusedInput="start"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  fireEvent.click(
    container
      .querySelector('[data-date="2020-06-20"]')!
      .querySelector('.sinoui-date-cell-content')!,
  );
  fireEvent.click(getByText('保存'));

  expect(onChange).toBeCalledWith(['2020-06-20', '2020-07-12']);
});

it('选择完开始日期，自动跳转到选择结束日期', () => {
  const { container, getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <MobileDateRangeView
        defaultYear={2020}
        defaultMonth={5}
        minDate={parseDate('2020-06-10')}
        focusedInput="start"
      />
    </ThemeProvider>,
  );

  expect(getByText('开始时间')).toHaveStyle('opacity:1');
  expect(getByText('结束时间')).toHaveStyle('opacity:0.7');
  fireEvent.click(
    container
      .querySelector('[data-date="2020-06-20"]')!
      .querySelector('.sinoui-date-cell-content')!,
  );

  expect(getByText('6月20日')).toHaveStyle('opacity:0.7');
  expect(getByText('结束时间')).toHaveStyle('opacity:1');
});

it('结束日期不能早于开始日期', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <MobileDateRangeView
        defaultYear={2020}
        defaultMonth={5}
        minDate={parseDate('2020-06-10')}
        focusedInput="start"
      />
    </ThemeProvider>,
  );

  fireEvent.click(
    container
      .querySelector('[data-date="2020-06-20"]')!
      .querySelector('.sinoui-date-cell-content')!,
  );

  expect(container.querySelector('[data-date="2020-06-18"]')).toHaveClass(
    'sinoui-date-cell--disabled',
  );
});

it('选择的开始时间大于结束时间时，清空结束时间', () => {
  const { container, getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <MobileDateRangeView
        startDate={parseDate('2020-06-10')}
        endDate={parseDate('2020-06-18')}
        focusedInput="start"
      />
    </ThemeProvider>,
  );

  expect(getByText('6月18日')).toBeInTheDocument();

  fireEvent.click(
    container
      .querySelector('[data-date="2020-06-20"]')!
      .querySelector('.sinoui-date-cell-content')!,
  );

  expect(getByText('结束时间')).toBeInTheDocument();
});

it('style 属性', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <MobileDateRangeView
        data-testid="view"
        startDate={parseDate('2020-06-10')}
        endDate={parseDate('2020-06-18')}
        focusedInput="start"
        style={{ color: 'red' }}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('view')).toHaveStyle('color: red');
});

it('ref属性', () => {
  const rangeViewRef = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <MobileDateRangeView
        data-testid="view"
        startDate={parseDate('2020-06-10')}
        endDate={parseDate('2020-06-18')}
        focusedInput="start"
        style={{ color: 'red' }}
        ref={rangeViewRef}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('view')).toEqual(rangeViewRef.current);
});

it('清除值', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <MobileDateRangeView
        startDate={parseDate('2020-06-10')}
        endDate={parseDate('2020-06-18')}
        focusedInput="start"
      />
    </ThemeProvider>,
  );

  fireEvent.click(getByText('清除'));

  expect(getByText('开始时间')).toBeInTheDocument();
  expect(getByText('结束时间')).toBeInTheDocument();
});
