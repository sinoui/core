import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClockPointer from '../ClockPointer';

it('分钟视图，旋转到11分，圆点背景色为白色', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClockPointer
        isHourView={false}
        rotateDeg={36}
        data-testid="clock-pointer"
      />
    </ThemeProvider>,
  );
  expect(
    getByTestId('clock-pointer').querySelector(
      '.sinoui-clock__pointer-minute-dot',
    ),
  ).toHaveStyle('background-color: #fff');
});

it('分钟视图，旋转到10分，圆点背景色为主题色', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClockPointer
        isHourView={false}
        rotateDeg={30}
        data-testid="clock-pointer"
      />
    </ThemeProvider>,
  );
  expect(
    getByTestId('clock-pointer').querySelector(
      '.sinoui-clock__pointer-minute-dot',
    ),
  ).toHaveStyle('background-color: #3f51b5');
});

it('时钟视图，圆点背景色为主题色', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClockPointer isHourView rotateDeg={30} data-testid="clock-pointer" />
    </ThemeProvider>,
  );
  expect(
    getByTestId('clock-pointer').querySelector(
      '.sinoui-clock__pointer-minute-dot',
    ),
  ).toHaveStyle('background-color: #3f51b5');
});

describe('快照测试', () => {
  it('时钟视图', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClockPointer isHourView rotateDeg={90} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('分钟视图', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClockPointer isHourView={false} rotateDeg={180} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
