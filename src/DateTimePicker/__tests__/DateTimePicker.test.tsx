/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DateTimePicker from '../DateTimePicker';
import { MONTH_FULL_TITLES } from '../../DatePicker/constants';

afterEach(cleanup);

describe('value', () => {
  it('显示指定日期时间', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          portal={false}
          value="2020-06-18 15:30"
        />
      </ThemeProvider>,
    );

    expect(getByTestId('date-time-picker')).toHaveTextContent(
      '2020-06-18 15:30',
    );
  });

  it('显示不同日期时间', () => {
    const { rerender, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          portal={false}
          value="2020-06-18 15:30"
          isPc
        />
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          portal={false}
          value="2020-06-20 14:20"
          isPc
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;
    expect(textInput).toHaveTextContent('2020-06-20 14:20');

    act(() => {
      fireEvent.click(textInput);
    });
    // 最新value值代表的日期时间被选中
    expect(container.querySelector('[data-date="2020/6/20"]')).toHaveClass(
      'sinoui-date-cell--selected',
    );
    expect(
      container.querySelectorAll('.sinoui-time-item--selected')[0],
    ).toHaveTextContent('14');
    expect(
      container.querySelectorAll('.sinoui-time-item--selected')[1],
    ).toHaveTextContent('20');
  });

  it('值无效时,页面显示为空,弹窗默认为当前月份', () => {
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          portal={false}
          value="adf"
          isPc
        />
      </ThemeProvider>,
    );

    expect(getByTestId('date-time-picker').textContent).toBeFalsy();
    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    const date = new Date();

    expect(
      container.querySelector('.sinoui-calendar-view-header'),
    ).toHaveTextContent(
      `${date.getFullYear()}年${MONTH_FULL_TITLES[date.getMonth()]}`,
    );
  });

  it('清除值', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          portal={false}
          value="2020-06-18 15:30"
          onChange={onChange}
          allowClear
        />
      </ThemeProvider>,
    );

    const clearButton = container.querySelector(
      '.sinoui-base-input__clear > svg',
    )!;

    act(() => {
      fireEvent.click(clearButton);
    });

    expect(onChange).toBeCalledWith('');
  });
});

describe('pc端', () => {
  it('点击出现日期时间选择弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          portal={false}
          value="2020-06-18 15:30"
          isPc
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;
    act(() => {
      fireEvent.click(textInput);
    });

    expect(
      container.querySelector('.sinoui-date-time-view'),
    ).toBeInTheDocument();
  });

  it('失去焦点，关闭弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          portal={false}
          value="2020-06-18 15:30"
          isPc
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;
    const input = container.querySelector('.sinoui-base-input__input')!;
    act(() => {
      fireEvent.click(textInput);
    });
    act(() => {
      fireEvent.blur(input);
    });

    expect(container.querySelector('.sinoui-date-time-view')).toBeFalsy();
  });

  it('点击选择日期时间', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimePicker
          data-testid="date-time-picker"
          value="2020-06-18 15:30"
          portal={false}
          isPc
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    const dateTimeView = container.querySelector('.sinoui-date-time-view')!;

    const timeList = container.querySelector(
      '.sinoui-date-time-select__time-list',
    )!;
    fireEvent.click(
      dateTimeView.querySelector(
        '[data-date="2020/6/24"] > .sinoui-date-cell-content',
      )!,
    );

    fireEvent.click(
      timeList
        .querySelector('.sinoui-date-time-select-view__hour-list')!
        .querySelector('[data-time-value="18"]')!,
    );

    fireEvent.click(
      timeList
        .querySelector('.sinoui-date-time-select-view__minute-list')!
        .querySelector('[data-time-value="35"]')!,
    );

    expect(onChange).toBeCalledTimes(3);
  });
});
