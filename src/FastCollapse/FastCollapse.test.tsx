import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import { create } from 'react-test-renderer';
import animate from './animate';
import FastCollapse from './FastCollapse';

jest.mock('./animate');

afterEach(cleanup);

/**
 * 模拟动画内容元素的尺寸
 *
 * @param collapseElement 动画根元素
 * @param width 宽度
 * @param height 高度
 */
const mockCollapseContentSize = (
  collapseElement: HTMLDivElement | null,
  width = 100,
  height = 100,
) => {
  const contentElement = collapseElement?.querySelector(
    '.sinoui-collapse-content',
  );
  if (contentElement) {
    Object.defineProperty(contentElement, 'clientWidth', {
      configurable: true,
      value: width,
    });
    Object.defineProperty(contentElement, 'clientHeight', {
      configurable: true,
      value: height,
    });
  }
};

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
      <FastCollapse data-testid="collapse" in>
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(1, 1)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(1, 1)',
  );
});

it('默认隐藏', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse
        data-testid="collapse"
        in={false}
        ref={mockCollapseContentSize}
      >
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(1, 0)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(1, 60)',
  );
});

it('隐藏 -> 展现', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse data-testid="collapse" in={false}>
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse data-testid="collapse" in>
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(1, 1)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(1, 1)',
  );
});

it('显示 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse data-testid="collapse" in ref={mockCollapseContentSize}>
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse
        data-testid="collapse"
        in={false}
        ref={mockCollapseContentSize}
      >
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transform: scale(1, 0)');
  expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
    'transform: scale(1, 60)',
  );
});

it('clean timeout after unmounted', () => {
  const onEntered = jest.fn();
  const { unmount } = render(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse
        in
        timeout="auto"
        data-testid="collapse"
        onEntered={onEntered}
      >
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  unmount();
  expect(onEntered).not.toBeCalled();
});

it('ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse in timeout="auto" data-testid="collapse" ref={ref}>
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  expect(ref.current).toBe(getByTestId('collapse'));
});

it('onEnter, onEntering', () => {
  const onEnter = jest.fn();
  const onEntering = jest.fn();

  render(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse in onEnter={onEnter} onEntering={onEntering}>
        <div>测试</div>
      </FastCollapse>
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
      <FastCollapse in onExit={onExit} onExiting={onExiting}>
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );
  rerender(
    <ThemeProvider theme={defaultTheme}>
      <FastCollapse in={false} onExit={onExit} onExiting={onExiting}>
        <div>测试</div>
      </FastCollapse>
    </ThemeProvider>,
  );

  expect(onExit).toBeCalled();
  expect(onExiting).toBeCalled();
});

describe('水平方向', () => {
  it('默认隐藏', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <FastCollapse
          data-testid="collapse"
          in={false}
          ref={mockCollapseContentSize}
          direction="horizontal"
        >
          <div>测试</div>
        </FastCollapse>
      </ThemeProvider>,
    );

    expect(getByTestId('collapse')).toHaveStyle('transform: scale(0, 1)');
    expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
      'transform: scale(60, 1)',
    );
  });

  it('显示 -> 隐藏', () => {
    const { getByTestId, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <FastCollapse
          data-testid="collapse"
          in
          ref={mockCollapseContentSize}
          direction="horizontal"
        >
          <div>测试</div>
        </FastCollapse>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <FastCollapse
          data-testid="collapse"
          in={false}
          ref={mockCollapseContentSize}
          direction="horizontal"
        >
          <div>测试</div>
        </FastCollapse>
      </ThemeProvider>,
    );

    expect(getByTestId('collapse')).toHaveStyle('transform: scale(0, 1)');
    expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
      'transform: scale(60, 1)',
    );
  });
});

describe('双方向', () => {
  it('默认隐藏', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <FastCollapse
          data-testid="collapse"
          in={false}
          ref={mockCollapseContentSize}
          direction="both"
        >
          <div>测试</div>
        </FastCollapse>
      </ThemeProvider>,
    );

    expect(getByTestId('collapse')).toHaveStyle('transform: scale(0, 0)');
    expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
      'transform: scale(60, 60)',
    );
  });

  it('显示 -> 隐藏', () => {
    const { getByTestId, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <FastCollapse
          data-testid="collapse"
          in
          ref={mockCollapseContentSize}
          direction="both"
        >
          <div>测试</div>
        </FastCollapse>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <FastCollapse
          data-testid="collapse"
          in={false}
          ref={mockCollapseContentSize}
          direction="both"
        >
          <div>测试</div>
        </FastCollapse>
      </ThemeProvider>,
    );

    expect(getByTestId('collapse')).toHaveStyle('transform: scale(0, 0)');
    expect(getByTestId('collapse').querySelector('div')).toHaveStyle(
      'transform: scale(60, 60)',
    );
  });
});

describe('快照测试', () => {
  it('展现', () => {
    const tree = create(
      <ThemeProvider theme={defaultTheme}>
        <FastCollapse data-testid="collapse" in>
          <div>测试</div>
        </FastCollapse>
      </ThemeProvider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
