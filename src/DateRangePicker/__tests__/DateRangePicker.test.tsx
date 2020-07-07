/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import { act } from 'react-test-renderer';
import DateRangePicker from '../DateRangePicker';

afterEach(cleanup);

jest.useFakeTimers();

describe('value', () => {
  it('显示指定日期', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker value={['2020-06-12', '2020-07-10']} portal={false} />
      </ThemeProvider>,
    );

    expect(
      container.querySelector('.sinoui-date-range-picker'),
    ).toHaveTextContent('2020-06-12 ~ 2020-07-10');
  });

  it('显示不同的日期', () => {
    const { container, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          value={['2020-06-12', '2020-07-10']}
          portal={false}
          isPc
        />
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          value={['2020-07-12', '2020-08-10']}
          portal={false}
          isPc
        />
      </ThemeProvider>,
    );

    expect(
      container.querySelector('.sinoui-date-range-picker'),
    ).toHaveTextContent('2020-07-12 ~ 2020-08-10');

    const input = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(input);
    });

    expect(container.querySelector('[data-date="2020/7/12"]')).toHaveClass(
      'sinoui-date-cell--selected',
    );
  });
});

describe('pc端', () => {
  it('点击出现日期选择弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker portal={false} isPc />
      </ThemeProvider>,
    );

    const input = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(input);
    });

    expect(
      container.querySelector('.sinoui-date-range-view'),
    ).toBeInTheDocument();
  });

  it('在弹窗出现的情况下，直接点击其他区域使input失去焦点，弹窗关闭', () => {
    const { container, getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <>
          <DateRangePicker portal={false} isPc />
          <input data-testid="input" />
        </>
      </ThemeProvider>,
    );

    const input = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(input);
    });

    act(() => {
      getByTestId('input').focus();
    });

    act(() => {
      fireEvent.blur(container.querySelector('.sinoui-date-range-picker')!);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('.sinoui-date-range-view')).toBeFalsy();
  });

  it('点击开始时间的输入框,出现弹窗，选择日期之后，结束日期输入框获取焦点', () => {
    const onChange = jest.fn();
    const { container, getByPlaceholderText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          portal={false}
          defaultYear={2020}
          defaultMonth={5}
          min="2020-06-07"
          isPc
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = container.querySelectorAll('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(input[0]);
    });

    act(() => {
      fireEvent.click(
        container
          .querySelector('[data-date="2020/6/18"]')
          ?.querySelector('.sinoui-date-cell-content')!,
      );
    });

    expect(onChange).toBeCalledWith(['2020-06-18', '']);

    expect(document.activeElement).toBe(getByPlaceholderText('结束时间'));
  });

  it('空值状态下，点击结束日期输入框，弹出弹窗，点击任一日期，该日期被选中，焦点移动至第一个输入框', () => {
    const onChange = jest.fn();
    const { container, getByPlaceholderText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          defaultYear={2020}
          defaultMonth={5}
          portal={false}
          min="2020-06-07"
          isPc
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = container.querySelectorAll('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(input[1]);
    });

    act(() => {
      fireEvent.click(
        container
          .querySelector('[data-date="2020/6/18"]')
          ?.querySelector('.sinoui-date-cell-content')!,
      );
    });

    expect(onChange).toBeCalledWith(['', '2020-06-18']);

    expect(document.activeElement).toBe(getByPlaceholderText('开始时间'));
  });

  it('有值状态下，点击开始时间后的清除按钮，只清除开始时间', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          value={['2020-06-12', '2020-07-10']}
          portal={false}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = container.querySelectorAll('.sinoui-base-input');

    act(() => {
      fireEvent.click(input[0].querySelector('.sinoui-base-input__clear svg')!);
    });

    expect(onChange).toBeCalledWith(['', '2020-07-10']);
  });

  it('有值状态下，点击结束时间后的清除按钮，清除结束时间', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          value={['2020-06-12', '2020-07-10']}
          portal={false}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = container.querySelectorAll('.sinoui-base-input');

    act(() => {
      fireEvent.click(input[1].querySelector('.sinoui-base-input__clear svg')!);
    });

    expect(onChange).toBeCalledWith(['2020-06-12', '']);
  });

  it('选择的开始日期大于结束日期时，清空结束日期', () => {
    const onChange = jest.fn();
    const { container, getByPlaceholderText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          portal={false}
          min="2020-06-07"
          value={['', '2020-07-20']}
          isPc
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = container.querySelectorAll('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(input[0]);
    });

    act(() => {
      fireEvent.click(
        container
          .querySelector('[data-date="2020/7/22"]')
          ?.querySelector('.sinoui-date-cell-content')!,
      );
    });

    expect(onChange).toBeCalledWith(['2020-07-22', '']);

    expect(document.activeElement).toBe(getByPlaceholderText('结束时间'));
  });
});
