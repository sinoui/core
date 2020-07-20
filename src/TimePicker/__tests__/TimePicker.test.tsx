/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import TimePicker from '../TimePicker';

afterEach(cleanup);

jest.useFakeTimers();

it('展示时间选择组件', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        wrapperProps={{
          'data-testid': 'time-picker',
        }}
        value="12:12"
      />
    </ThemeProvider>,
  );

  const timePicker = getByTestId('time-picker');

  expect(timePicker.querySelector('input')).toHaveValue('12:12');
  expect(timePicker).toHaveClass('sinoui-time-picker');
});

it('点击指示图标，弹出选项', () => {
  const { getByRole } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        wrapperProps={{
          'data-testid': 'time-picker',
        }}
        value="12:12"
        isPc
      />
    </ThemeProvider>,
  );

  const button = getByRole('button');

  fireEvent.click(button);

  expect(document.querySelector('.sinoui-time-select-view')).toBeTruthy();
});

it('弹窗失去焦点后，关闭弹窗', () => {
  const { getByRole, getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        wrapperProps={{
          'data-testid': 'time-picker',
        }}
        value="12:12"
        isPc
      />
    </ThemeProvider>,
  );

  const timePicker = getByTestId('time-picker');
  const button = getByRole('button');

  fireEvent.click(button);

  const timeSelectView = document.querySelector('.sinoui-time-select-view')!;

  act(() => {
    (timePicker.querySelector('input') as HTMLElement).focus();
    fireEvent.blur(timeSelectView);
    jest.runAllTimers();
  });

  expect(document.querySelector('.sinoui-time-select-view')).toBeFalsy();
});

describe('输入框', () => {
  it('输入框变更，不回调onChange', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimePicker
          wrapperProps={{
            'data-testid': 'time-picker',
          }}
          value="12:12"
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const timePicker = getByTestId('time-picker');
    const input = timePicker.querySelector('input')!;

    fireEvent.change(input, { target: { value: '15:15' } });

    expect(onChange).not.toBeCalled();
    expect(input).toHaveValue('15:15');
  });

  it('输入框失去焦点，且输入框文本为正确格式的时间，则输入框文本作为新的值回调onChange', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimePicker
          wrapperProps={{
            'data-testid': 'time-picker',
          }}
          value="12:12"
          onChange={onChange}
          onBlur={onBlur}
        />
      </ThemeProvider>,
    );

    const timePicker = getByTestId('time-picker');
    const input = timePicker.querySelector('input')!;

    fireEvent.change(input, { target: { value: '15:15' } });
    fireEvent.blur(input);

    expect(onChange).toBeCalledWith('15:15');
  });

  it('输入框失去焦点时，输入框文本为空，则以空字符串回调onChange', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimePicker
          wrapperProps={{
            'data-testid': 'time-picker',
          }}
          value="12:12"
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const timePicker = getByTestId('time-picker');
    const input = timePicker.querySelector('input')!;

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);

    expect(onChange).toBeCalledWith('');
  });

  it('输入框失去焦点时，输入框文本为不符合时间格式的字符串，不调用onChange，但是重置输入框文本为value', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimePicker
          wrapperProps={{
            'data-testid': 'time-picker',
          }}
          value="12:12"
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const timePicker = getByTestId('time-picker');
    const input = timePicker.querySelector('input')!;

    fireEvent.change(input, { target: { value: 'xxxxxx' } });
    fireEvent.blur(input);

    expect(onChange).not.toBeCalled();
    expect(input).toHaveValue('12:12');
  });

  it('空值时，输入框文本变更为任意字符串，失去焦点时，输入框应清空', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimePicker
          wrapperProps={{
            'data-testid': 'time-picker',
          }}
        />
      </ThemeProvider>,
    );

    const timePicker = getByTestId('time-picker');
    const input = timePicker.querySelector('input')!;

    fireEvent.change(input, { target: { value: '不合格文本' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('');
  });
});

it('点击图标打开弹窗时，选中的小时选项获取焦点', () => {
  const { getByRole } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker value="12:13" isPc />
    </ThemeProvider>,
  );

  const button = getByRole('button');

  fireEvent.click(button);

  expect(document.activeElement).toHaveAttribute('data-time-value', '12');
});

it('重绘', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        wrapperProps={{
          'data-testid': 'time-picker',
        }}
        value="12:12"
      />
    </ThemeProvider>,
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        wrapperProps={{
          'data-testid': 'time-picker',
        }}
        value="15:22"
      />
    </ThemeProvider>,
  );

  const timePicker = getByTestId('time-picker');

  expect(timePicker.querySelector('input')).toHaveValue('15:22');
});

it('disabled', () => {
  const { getByTestId, getByRole } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        wrapperProps={{
          'data-testid': 'time-picker',
        }}
        value="12:12"
        disabled
      />
    </ThemeProvider>,
  );

  const timePicker = getByTestId('time-picker');

  expect(timePicker).toHaveClass('sinoui-time-picker--disabled');

  const button = getByRole('button');

  fireEvent.click(button);

  expect(document.querySelector('.sinoui-time-select-view')).not.toBeTruthy();
});

it('readOnly', () => {
  const { getByTestId, getByRole } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        wrapperProps={{
          'data-testid': 'time-picker',
        }}
        value="12:12"
        readOnly
      />
    </ThemeProvider>,
  );

  const timePicker = getByTestId('time-picker');

  expect(timePicker).toHaveClass('sinoui-time-picker--read-only');

  const button = getByRole('button');

  fireEvent.click(button);

  expect(document.querySelector('.sinoui-time-select-view')).not.toBeTruthy();
});

it('阻止输入框的onChange事件上浮', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <div onChange={onChange}>
        <TimePicker value="12:12" />
      </div>
    </ThemeProvider>,
  );

  const input = container.querySelector('input')!;

  fireEvent.change(input, { target: { value: '123' } });

  expect(onChange).not.toBeCalled();
});

it('监听onblur事件', () => {
  const onBlur = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker value="12:12" onBlur={onBlur} />
    </ThemeProvider>,
  );

  const input = container.querySelector('input')!;

  fireEvent.blur(input);

  expect(onBlur).toBeCalled();
});

it('autoComplete=off', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePicker />
    </ThemeProvider>,
  );

  const input = container.querySelector('input')!;

  expect(input).toHaveAttribute('autocomplete', 'off');
});
