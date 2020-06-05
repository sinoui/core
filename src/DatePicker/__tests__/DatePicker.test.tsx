/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DatePicker from '../DatePicker';

afterEach(cleanup);

describe('pc端', () => {
  it('点击出现日期选择弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker label="日期选择" isPc />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    expect(
      container.querySelector('.sinoui-calendar-view'),
    ).toBeInTheDocument();
  });

  it('失去焦点，关闭弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker label="日期选择" isPc />
      </ThemeProvider>,
    );

    const input = container.querySelector('.sinoui-base-input__input')!;

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    act(() => {
      fireEvent.blur(input);
    });

    expect(container.querySelector('.sinoui-calendar-view')).toBeFalsy();
  });

  it('点击某个日期，选中某一项，并关闭弹窗', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker
          label="日期选择"
          isPc
          value="2020-06-05"
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    act(() => {
      fireEvent.click(getByText('11'));
    });

    expect(onChange).toBeCalledWith('2020-06-11');
    expect(container.querySelector('.sinoui-calendar-view')).toBeFalsy();
  });
});

describe('移动端', () => {
  it('点击出现日期选择弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker label="日期选择" isPc={false} />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    expect(document.querySelector('.sinoui-calendar-view')).toBeInTheDocument();
  });

  it('失去焦点，不关闭弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker label="日期选择" isPc={false} />
      </ThemeProvider>,
    );

    const input = container.querySelector('.sinoui-base-input__input')!;

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    act(() => {
      fireEvent.blur(input);
    });

    expect(document.querySelector('.sinoui-calendar-view')).toBeInTheDocument();
  });

  it('点击某个日期，按确定按钮，onChange被调用，弹窗关闭', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker
          label="日期选择"
          isPc={false}
          value="2020-06-05"
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    act(() => {
      fireEvent.click(getByText('11'));
    });

    act(() => {
      fireEvent.click(getByText('确定'));
    });

    expect(onChange).toBeCalledWith('2020-06-11');
    expect(document.querySelector('.sinoui-calendar-view')).toBeFalsy();
  });

  it('选中某个日期，再点取消，值不更新，弹窗关闭', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker
          label="日期选择"
          isPc={false}
          value="2020-06-05"
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    act(() => {
      fireEvent.click(getByText('11'));
    });

    act(() => {
      fireEvent.click(getByText('取消'));
    });

    expect(onChange).not.toBeCalled();
    expect(document.querySelector('.sinoui-calendar-view')).toBeFalsy();
  });
});
