/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import renderer, { act } from 'react-test-renderer';
import TimeInput from '../TimeInput';

afterEach(cleanup);

describe('镜像测试', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <TimeInput selectedHour="12" selectedMinute="24" />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

describe('验收测试', () => {
  it('渲染', () => {
    const { getByDisplayValue } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeInput selectedHour="12" selectedMinute="24" />
      </ThemeProvider>,
    );

    expect(getByDisplayValue('12')).toBeInTheDocument();
    expect(getByDisplayValue('24')).toBeInTheDocument();
  });

  it('输入值时，内部同步改变，onChange不被调用', () => {
    const onHourChange = jest.fn();
    const onMinuteChange = jest.fn();
    const { container, getByDisplayValue } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeInput
          selectedHour="12"
          selectedMinute="24"
          onMinuteChange={onMinuteChange}
          onHourChange={onHourChange}
        />
      </ThemeProvider>,
    );

    const hourInput = container.querySelector(
      '.sinoui-date-time-mobile-view__timeview-hour-input',
    );
    const minuteInput = container.querySelector(
      '.sinoui-date-time-mobile-view__timeview-minute-input',
    );

    act(() => {
      fireEvent.change(hourInput!.querySelector('input')!, {
        target: { value: '18' },
      });
      fireEvent.change(minuteInput!.querySelector('input')!, {
        target: { value: '45' },
      });
    });

    expect(getByDisplayValue('18')).toBeInTheDocument();
    expect(getByDisplayValue('45')).toBeInTheDocument();

    expect(onHourChange).not.toBeCalled();
    expect(onMinuteChange).not.toBeCalled();
  });

  it('输入不符合规范的小时，失去焦点时，小时输入框中的值会被重置为选中日期的时间', () => {
    const onHourChange = jest.fn();
    const onMinuteChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeInput
          selectedHour="12"
          selectedMinute="24"
          minHour={10}
          maxHour={23}
          onMinuteChange={onMinuteChange}
          onHourChange={onHourChange}
        />
      </ThemeProvider>,
    );

    const hourInput = container
      .querySelector('.sinoui-date-time-mobile-view__timeview-hour-input')!
      .querySelector('input')!;

    act(() => {
      fireEvent.change(hourInput, {
        target: { value: '36' },
      });
    });

    act(() => {
      fireEvent.blur(hourInput);
    });

    expect(onHourChange).toBeCalledWith('12');
    act(() => {
      fireEvent.change(hourInput, {
        target: { value: '5' },
      });
    });
    expect(onHourChange).toBeCalledWith('12');
  });

  it('输入不符合规范的分钟数，失去焦点时，将重置为选中日期时间的分钟数', () => {
    const onMinuteChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeInput
          selectedHour="12"
          selectedMinute="24"
          minMinute={10}
          maxMinute={59}
          onMinuteChange={onMinuteChange}
        />
      </ThemeProvider>,
    );

    const minuteInput = container
      .querySelector('.sinoui-date-time-mobile-view__timeview-minute-input')!
      .querySelector('input')!;

    act(() => {
      fireEvent.change(minuteInput, {
        target: { value: '90' },
      });
    });

    act(() => {
      fireEvent.blur(minuteInput);
    });

    expect(onMinuteChange).toBeCalledWith('24');
    act(() => {
      fireEvent.change(minuteInput, {
        target: { value: '5' },
      });
    });
    expect(onMinuteChange).toBeCalledWith('24');
  });
});
