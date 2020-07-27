import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Clock from '../Clock';

afterEach(cleanup);
jest.useFakeTimers();

it('鼠标按下后松开，触发时针旋转回调函数', () => {
  const onChangeHourRotateDeg = jest.fn();
  const onChangeMinuteRotateDeg = jest.fn();
  const onChangeHourOrMinuteView = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Clock
        isHourView
        hourRotateDeg={90}
        minuteRotateDeg={0}
        onChangeHourRotateDeg={onChangeHourRotateDeg}
        onChangeMinuteRotateDeg={onChangeMinuteRotateDeg}
        onChangeHourOrMinuteView={onChangeHourOrMinuteView}
        data-testid="sinoui-time-picker-clock"
      />
    </ThemeProvider>,
  );

  const clock = getByTestId('sinoui-time-picker-clock');
  act(() => {
    fireEvent.mouseDown(clock);
  });

  act(() => {
    fireEvent.mouseUp(clock);
  });
  expect(onChangeHourRotateDeg).toBeCalled();
});

it('鼠标按下移动，触发时针旋转回调函数', () => {
  const onChangeHourRotateDeg = jest.fn();
  const onChangeMinuteRotateDeg = jest.fn();
  const onChangeHourOrMinuteView = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Clock
        isHourView
        hourRotateDeg={90}
        minuteRotateDeg={0}
        onChangeHourRotateDeg={onChangeHourRotateDeg}
        onChangeMinuteRotateDeg={onChangeMinuteRotateDeg}
        onChangeHourOrMinuteView={onChangeHourOrMinuteView}
        data-testid="sinoui-time-picker-clock"
      />
    </ThemeProvider>,
  );

  const clock = getByTestId('sinoui-time-picker-clock');
  act(() => {
    fireEvent.mouseDown(clock);
  });

  act(() => {
    fireEvent.mouseMove(clock);
  });
  expect(onChangeHourRotateDeg).toBeCalled();
});

it('鼠标未按下移动，不触发时针旋转回调函数', () => {
  const onChangeHourRotateDeg = jest.fn();
  const onChangeMinuteRotateDeg = jest.fn();
  const onChangeHourOrMinuteView = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Clock
        isHourView
        hourRotateDeg={90}
        minuteRotateDeg={0}
        onChangeHourRotateDeg={onChangeHourRotateDeg}
        onChangeMinuteRotateDeg={onChangeMinuteRotateDeg}
        onChangeHourOrMinuteView={onChangeHourOrMinuteView}
        data-testid="sinoui-time-picker-clock"
      />
    </ThemeProvider>,
  );

  const clock = getByTestId('sinoui-time-picker-clock');

  act(() => {
    fireEvent.mouseMove(clock);
  });
  expect(onChangeHourRotateDeg).not.toBeCalled();
});

describe('快照测试', () => {
  const onChangeHourRotateDeg = jest.fn();
  const onChangeMinuteRotateDeg = jest.fn();
  const onChangeHourOrMinuteView = jest.fn();
  it('小时视图', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Clock
            isHourView
            hourRotateDeg={90}
            minuteRotateDeg={0}
            onChangeHourRotateDeg={onChangeHourRotateDeg}
            onChangeMinuteRotateDeg={onChangeMinuteRotateDeg}
            onChangeHourOrMinuteView={onChangeHourOrMinuteView}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('分钟视图', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Clock
            isHourView={false}
            hourRotateDeg={90}
            minuteRotateDeg={0}
            onChangeHourRotateDeg={onChangeHourRotateDeg}
            onChangeMinuteRotateDeg={onChangeMinuteRotateDeg}
            onChangeHourOrMinuteView={onChangeHourOrMinuteView}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
