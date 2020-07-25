import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import TimePickerMobileView from '../TimePickerMobileView';

afterEach(cleanup);

it('默认为时钟视图', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-time-picker-mobile-view__clock'),
  ).toBeTruthy();
});

it('点击图标，切换为键盘输入视图', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(container.querySelector('[data-view-icon]') as Element);
  });

  expect(
    container.querySelector('.sinoui-time-picker-mobile-view__keyboard'),
  ).toBeTruthy();
});

it('点击清除按钮', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );
  const clearBtn = getByTestId('clock-clear-btn');
  act(() => {
    fireEvent.click(clearBtn);
  });

  expect(onRequestClose).toBeCalled();
  expect(onChange).toBeCalled();
});

it('点击取消按钮', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );
  const cancelBtn = getByTestId('clock-cancel-btn');
  act(() => {
    fireEvent.click(cancelBtn);
  });

  expect(onRequestClose).toBeCalled();
  expect(onChange).not.toBeCalled();
});

it('点击设置按钮', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );
  const okBtn = getByTestId('clock-ok-btn');
  act(() => {
    fireEvent.click(okBtn);
  });

  expect(onRequestClose).toBeCalled();
  expect(onChange).toBeCalledWith('11:28');
});

it('选定小时，自动切换到分钟视图', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { container, getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );

  const clock = container.querySelector(
    '.sinoui-time-picker-mobile-view__clock',
  ) as Element;
  act(() => {
    fireEvent.mouseDown(clock);
  });

  act(() => {
    fireEvent.mouseUp(clock);
  });

  expect(getByText('05')).toBeInTheDocument();
});

it('调整角度，改变时针选中的值', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { container, getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );

  const clock = container.querySelector(
    '.sinoui-time-picker-mobile-view__clock',
  ) as Element;
  act(() => {
    fireEvent.mouseDown(clock, {
      clientX: 130,
      clientY: 267,
    });
  });

  act(() => {
    fireEvent.mouseMove(clock, {
      clientX: 237,
      clientY: 229,
    });
  });
  expect(getByText('4')).toHaveStyle('color:#fff');
});

describe('TimePickerMobileView', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  it('小时视图', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <TimePickerMobileView
            value="11:28"
            onChange={onChange}
            onRequestClose={onRequestClose}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
