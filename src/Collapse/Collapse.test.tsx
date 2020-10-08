import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { duration } from '@sinoui/theme/transitions';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import { create } from 'react-test-renderer';
import Collapse from './Collapse';

afterEach(cleanup);

jest.useFakeTimers();

const handleRef = (node: HTMLDivElement) => {
  if (node) {
    Object.defineProperty(node.firstChild, 'clientHeight', {
      configurable: true,
      value: 200,
    });
  }
};

it('默认展现', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse
        data-testid="collapse"
        in
        ref={(node) => {
          if (node) {
            Object.defineProperty(node.firstChild, 'clientHeight', {
              configurable: true,
              value: 200,
            });
          }
        }}
      >
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle(
    `height: 200px; transition-duration: ${duration.standard}ms;`,
  );

  // onEntered: `height: auto`
  jest.runAllTimers();
  expect(getByTestId('collapse')).toHaveStyle('height: auto');
});

it('默认隐藏', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in={false}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyleRule('min-height', '0px');
  expect(getByTestId('collapse')).toHaveStyleRule('height', '0px');
});

it('collapseHeight', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in={false} collapsedHeight={20}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyleRule('min-height', '20px');
});

it('显示 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in ref={handleRef}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  let heightOnExit = '0px';
  rerender(
    <ThemeProvider theme={defaultTheme}>
      <Collapse
        data-testid="collapse"
        in={false}
        ref={handleRef}
        onExit={(node) => {
          heightOnExit = node.style.height;
        }}
      >
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(heightOnExit).toBe('200px');
  expect(getByTestId('collapse')).toHaveStyle('height: 0px');
  expect(getByTestId('collapse')).toHaveStyle(
    `transition-duration: ${duration.standard}ms`,
  );
});

it('隐藏 -> 显示', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse
        data-testid="collapse"
        in={false}
        ref={handleRef}
        collapsedHeight={20}
      >
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  let heightOnEnter = '0px';
  rerender(
    <ThemeProvider theme={defaultTheme}>
      <Collapse
        data-testid="collapse"
        in
        ref={handleRef}
        collapsedHeight={20}
        onEnter={(node) => {
          heightOnEnter = node.style.height;
        }}
      >
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  // onEnter: height: 20px
  expect(heightOnEnter).toBe('20px');
  // onEntering: height: 200px
  expect(getByTestId('collapse')).toHaveStyle('height: 200px');
  // onEntered: `height: auto`
  jest.runAllTimers();
  expect(getByTestId('collapse')).toHaveStyle('height: auto');
});

it('auto timeout', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse in timeout="auto" ref={handleRef} data-testid="collapse">
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transition-duration: 281ms');

  // 验证addEndListener
  jest.runAllTimers();
  expect(getByTestId('collapse')).toHaveStyle('height: auto');

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <Collapse
        in={false}
        timeout="auto"
        ref={handleRef}
        data-testid="collapse"
      >
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyle('transition-duration: 281ms');
});

it('clean timeout after unmounted', () => {
  const onEntered = jest.fn();
  const { unmount } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse
        in
        timeout="auto"
        ref={handleRef}
        data-testid="collapse"
        onEntered={onEntered}
      >
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  unmount();
  jest.runAllTimers();
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

it('onEnter, onEntering, onEntered', () => {
  const onEnter = jest.fn();
  const onEntering = jest.fn();
  const onEntered = jest.fn();

  render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse
        in
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(onEnter).toBeCalled();
  expect(onEntering).toBeCalled();
  expect(onEntered).not.toBeCalled();

  jest.runAllTimers();

  expect(onEntered).toBeCalled();
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
      <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
          <Collapse in>
            <div>测试</div>
          </Collapse>
        </ThemeProvider>
      </React.StrictMode>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
