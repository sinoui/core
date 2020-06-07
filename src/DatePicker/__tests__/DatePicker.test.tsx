/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DatePicker from '../DatePicker';

afterEach(cleanup);

describe('value', () => {
  it('显示指定的日期', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker
          label="日期选择"
          value="2020-12-12"
          data-testid="datepicker"
        />
      </ThemeProvider>,
    );

    expect(getByTestId('datepicker')).toHaveTextContent('2020-12-12');
  });

  it('显示不同的日期', () => {
    const { rerender, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker
          label="日期选择"
          value="2020-12-12"
          data-testid="datepicker"
          isPc
        />
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker
          label="日期选择"
          value="2020-01-15"
          data-testid="datepicker"
          isPc
        />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;
    expect(textInput).toHaveTextContent('2020-01-15');

    act(() => {
      fireEvent.click(textInput);
    });
    // 最新value值代表的日期被选中
    expect(container.querySelector('[data-date="2020/1/15"]')).toHaveClass(
      'sinoui-date-cell--selected',
    );
  });
});

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

    expect(onChange).not.toBeCalled();
    expect(
      document.querySelector('.sinoui-date-cell--selected'),
    ).toHaveTextContent('11');

    act(() => {
      fireEvent.click(getByText('设置'));
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

  it('默认今日选中', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker label="日期选择" isPc={false} />
      </ThemeProvider>,
    );

    const textInput = container.querySelector('.sinoui-base-input')!;

    act(() => {
      fireEvent.click(textInput);
    });

    expect(
      document.querySelector('.sinoui-date-cell--selected'),
    ).toHaveTextContent(`${new Date().getDate()}`);
  });
});

it('min', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        label="日期选择"
        isPc
        value="2020-06-05"
        min="2020-06-04"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const textInput = container.querySelector('.sinoui-base-input')!;

  act(() => {
    fireEvent.click(textInput);
  });

  expect(container.querySelector('[data-date="2020/6/3"]')).toHaveClass(
    'sinoui-date-cell--disabled',
  );
});

it('max', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        label="日期选择"
        isPc
        value="2020-06-05"
        max="2020-06-24"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const textInput = container.querySelector('.sinoui-base-input')!;

  act(() => {
    fireEvent.click(textInput);
  });

  expect(container.querySelector('[data-date="2020/6/24"]')).toHaveClass(
    'sinoui-date-cell--disabled',
  );
});

it('弹窗标题', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        label="出生日期"
        isPc={false}
        value="2020-06-05"
        max="2020-06-24"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const textInput = container.querySelector('.sinoui-base-input')!;

  act(() => {
    fireEvent.click(textInput);
  });

  expect(document.querySelector('.sinoui-calendar-view')).toHaveTextContent(
    '设置出生日期',
  );
});

it('modalTitle', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        label="出生日期"
        modalTitle="设置日期"
        isPc={false}
        value="2020-06-05"
        max="2020-06-24"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const textInput = container.querySelector('.sinoui-base-input')!;

  act(() => {
    fireEvent.click(textInput);
  });

  expect(document.querySelector('.sinoui-calendar-view')).toHaveTextContent(
    '设置日期',
  );
});
