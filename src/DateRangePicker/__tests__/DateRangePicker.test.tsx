/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
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

    expect(container.querySelector('[data-date="2020-07-12"]')).toHaveClass(
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
          .querySelector('[data-date="2020-06-18"]')
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
          .querySelector('[data-date="2020-06-18"]')
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
          defaultYear={2020}
          defaultMonth={6}
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
          .querySelector('[data-date="2020-07-22"]')
          ?.querySelector('.sinoui-date-cell-content')!,
      );
    });

    expect(onChange).toBeCalledWith(['2020-07-22', '']);

    expect(document.activeElement).toBe(getByPlaceholderText('结束时间'));
  });
});

describe('移动端', () => {
  it('点击出现日期选择弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker isPc={false} />
      </ThemeProvider>,
    );

    const input = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(input);
    });

    expect(
      document.querySelector('.sinoui-date-range-mobile-view'),
    ).toBeInTheDocument();
  });

  it('失去焦点，不关闭弹窗', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker isPc={false} />
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

    expect(
      document.querySelector('.sinoui-date-range-mobile-view'),
    ).toBeInTheDocument();
  });

  it('选择日期后，点击保存按钮,onChange被调用，弹窗关闭', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          isPc={false}
          defaultMonth={5}
          defaultYear={2020}
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
        document
          .querySelector('[data-date="2020-06-18"]')!
          .querySelector('.sinoui-date-cell-content')!,
      );
    });

    fireEvent.click(getByText('保存'));

    jest.runAllTimers();
    expect(onChange).toBeCalledWith(['2020-06-18', '']);
    expect(
      document.querySelector('.sinoui-date-range-mobile-view'),
    ).toBeFalsy();
  });

  it('选择日期后，点击关闭按钮,值不更新，弹窗关闭', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          isPc={false}
          defaultMonth={5}
          defaultYear={2020}
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
        document
          .querySelector('[data-date="2020-06-18"]')!
          .querySelector('.sinoui-date-cell-content')!,
      );

      fireEvent.click(
        document
          .querySelector('.sinoui-date-range-view-toolbar')!
          .querySelector('.sinoui-icon-button')!,
      );
    });

    jest.runAllTimers();

    expect(onChange).not.toBeCalled();
    expect(
      document.querySelector('.sinoui-date-range-mobile-view'),
    ).toBeFalsy();
  });

  it('日期选择后，点击清除按钮，清空选中值，不关闭弹窗', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateRangePicker
          isPc={false}
          defaultMonth={5}
          defaultYear={2020}
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
        document
          .querySelector('[data-date="2020-06-18"]')!
          .querySelector('.sinoui-date-cell-content')!,
      );
    });

    fireEvent.click(getByText('清除'));

    expect(onChange).not.toBeCalled();
    expect(
      document.querySelector('.sinoui-date-range-view-toolbar__selected-date'),
    ).toHaveTextContent('开始时间-结束时间');

    expect(
      document.querySelector('.sinoui-date-range-mobile-view'),
    ).toBeInTheDocument();
  });
});

it('className属性', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangePicker
        isPc
        defaultMonth={5}
        defaultYear={2020}
        className="custom-class"
      />
    </ThemeProvider>,
  );

  const rootDom = container.querySelector('.sinoui-date-range-picker');
  expect(container.querySelector('.custom-class')).toBe(rootDom);
});

it('style属性指定给根节点', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangePicker
        isPc
        defaultMonth={5}
        defaultYear={2020}
        style={{ width: 400 }}
      />
    </ThemeProvider>,
  );

  const rootDom = container.querySelector('.sinoui-date-range-picker');
  expect(rootDom).toHaveStyle('width: 400px;');
});

it('toTitle属性', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangePicker
        isPc
        defaultMonth={5}
        defaultYear={2020}
        value={['2020-06-12', '2020-06-28']}
        toTitle={<div>至</div>}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-date-range-picker'),
  ).toHaveTextContent('2020-06-12至2020-06-28');
});

it('startInputLabel和endInputLabel', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangePicker
        isPc
        defaultMonth={5}
        defaultYear={2020}
        toTitle={<div>至</div>}
        startInputLabel="开始"
        endInputLabel="结束"
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-date-range-picker__start-input > label'),
  ).toHaveTextContent('开始');
  expect(
    container.querySelector('.sinoui-date-range-picker__end-input > label'),
  ).toHaveTextContent('结束');
});

it('startInputPlacehold和endInputPlacehold', () => {
  const { container, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangePicker
        isPc
        defaultMonth={5}
        defaultYear={2020}
        toTitle={<div>至</div>}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-date-range-picker__start-input'),
  ).toHaveTextContent('开始时间');
  expect(
    container.querySelector('.sinoui-date-range-picker__end-input'),
  ).toHaveTextContent('结束时间');

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <DateRangePicker
        isPc
        defaultMonth={5}
        defaultYear={2020}
        toTitle={<div>至</div>}
        startInputPlaceholder="开始"
        endInputPlaceholder="结束"
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-date-range-picker__start-input'),
  ).toHaveTextContent('开始');
  expect(
    container.querySelector('.sinoui-date-range-picker__end-input'),
  ).toHaveTextContent('结束');
});
