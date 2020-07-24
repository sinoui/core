import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClockPointer from '../ClockPointer';

it('分钟视图，旋转到11分，指针中心显示白色圆点', () => {
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
  ).toBeInTheDOM();
});

it('分钟视图，旋转到10分，指针中心不显示白色圆点', () => {
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
  ).toBeFalsy();
});

it('时钟视图，指针中心不显示白色圆点', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClockPointer isHourView rotateDeg={30} data-testid="clock-pointer" />
    </ThemeProvider>,
  );
  expect(
    getByTestId('clock-pointer').querySelector(
      '.sinoui-clock__pointer-minute-dot',
    ),
  ).toBeFalsy();
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
