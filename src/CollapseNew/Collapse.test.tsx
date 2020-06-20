import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import { create } from 'react-test-renderer';
import animate from './animate';
import Collapse from './Collapse';

jest.mock('./animate');

afterEach(cleanup);

beforeEach(() => {
  (animate as jest.Mock).mockImplementation(
    (_duration: number, frameCallback) => {
      const interpolation = (_startValue: number, endValue: number) => endValue;
      frameCallback(interpolation);
    },
  );
});

it('默认展现', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(1, 1)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(1, 1)',
  );
});

xit('默认隐藏', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in={false}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(0, 0)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(60, 60)',
  );
});

it('隐藏 -> 展现', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in={false}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(1, 1)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(1, 1)',
  );
});

xit('显示 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in={false}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(0, 0)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(1, 60)',
  );
});

it('clean timeout after unmounted', () => {
  const onEntered = jest.fn();
  const { unmount } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse in timeout="auto" data-testid="collapse" onEntered={onEntered}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  unmount();
  expect(onEntered).not.toBeCalled();
});

it('ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse in timeout="auto" data-testid="collapse" ref={ref}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(ref.current).toBe(getByTestId('collapse'));
});

it('onEnter, onEntering', () => {
  const onEnter = jest.fn();
  const onEntering = jest.fn();

  render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse in onEnter={onEnter} onEntering={onEntering}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(onEnter).toBeCalled();
  expect(onEntering).toBeCalled();
});

it('onExit, onExiting', () => {
  const onExit = jest.fn();
  const onExiting = jest.fn();
  const { rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse in onExit={onExit} onExiting={onExiting}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );
  rerender(
    <ThemeProvider theme={defaultTheme}>
      <Collapse in={false} onExit={onExit} onExiting={onExiting}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(onExit).toBeCalled();
  expect(onExiting).toBeCalled();
});

describe('快照测试', () => {
  it('展现', () => {
    const tree = create(
      <ThemeProvider theme={defaultTheme}>
        <Collapse data-testid="collapse" in>
          <div>测试</div>
        </Collapse>
      </ThemeProvider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
