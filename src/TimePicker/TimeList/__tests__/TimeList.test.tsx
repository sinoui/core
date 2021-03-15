/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createRef } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import TimeList, { TimeListRef } from '../TimeList';

afterEach(cleanup);

it('渲染时间列表', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList start={0} end={23} selected={10} data-testid="time-list" />
    </ThemeProvider>,
  );

  const timeList = getByTestId('time-list');

  expect(timeList).toHaveClass('sinoui-time-list');
  expect(
    timeList.querySelector('.sinoui-time-item--selected'),
  ).toHaveTextContent('10');
});

it('时间间隔', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList
        start={0}
        end={59}
        step={5}
        selected={10}
        data-testid="time-list"
      />
    </ThemeProvider>,
  );

  const timeList = getByTestId('time-list');

  expect(timeList).not.toHaveTextContent('09');
  expect(timeList).not.toHaveTextContent('11');
});

it('聚焦', () => {
  const ref = createRef<TimeListRef>();
  render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList start={0} end={59} selected={10} ref={ref} />
    </ThemeProvider>,
  );

  const list = ref.current;

  if (list) {
    list.focus();
  }

  expect(document.activeElement).toHaveTextContent('10');
});

it('时间范围', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList start={1} end={5} selected={2} data-testid="time-list" />
    </ThemeProvider>,
  );

  const timeList = getByTestId('time-list');
  const items = timeList.querySelectorAll<HTMLElement>('.sinoui-time-item');
  items.forEach((item) =>
    expect(['1', '2', '3', '4', '5']).toContain(item.dataset.timeValue),
  );
});

it('点击时间选项', () => {
  const onChange = jest.fn();

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList
        start={1}
        end={5}
        selected={2}
        data-testid="time-list"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const timeList = getByTestId('time-list');

  fireEvent.click(timeList.querySelector('[data-time-value="2"]')!);
  expect(onChange).toBeCalledWith(2);

  fireEvent.click(timeList.querySelector('[data-time-value="3"]')!);
  expect(onChange).toBeCalledWith(3);
  expect(document.activeElement).toHaveAttribute('data-time-value', '3');
});

it('使用向下键选中下一个时间选项', () => {
  const onChange = jest.fn();

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList
        start={1}
        end={5}
        selected={2}
        data-testid="time-list"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const timeList = getByTestId('time-list');

  fireEvent.keyDown(timeList, {
    key: 'ArrowDown',
  });

  expect(onChange).toBeCalledWith(3);
  expect(document.activeElement).toHaveAttribute('data-time-value', '3');
});

it('使用向上键选中上一个时间选项', () => {
  const onChange = jest.fn();

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList
        start={1}
        end={5}
        selected={2}
        data-testid="time-list"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const timeList = getByTestId('time-list');

  fireEvent.keyDown(timeList, {
    key: 'ArrowUp',
  });

  expect(onChange).toBeCalledWith(1);
  expect(document.activeElement).toHaveAttribute('data-time-value', '1');
});

it('style 和 className', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeList
        start={1}
        end={5}
        selected={2}
        data-testid="time-list"
        className="custom-time-list"
        style={{ color: 'red' }}
      />
    </ThemeProvider>,
  );

  const timeList = getByTestId('time-list');

  expect(timeList).toHaveClass('custom-time-list');
  expect(timeList).toHaveStyle('color: red');
});
