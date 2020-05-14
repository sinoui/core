import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { duration } from '@sinoui/theme/transitions';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import Collapse from './Collapse';

afterEach(cleanup);

jest.useFakeTimers();

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
  const handleRef = (node: HTMLDivElement) => {
    if (node) {
      Object.defineProperty(node.firstChild, 'clientHeight', {
        configurable: true,
        value: 200,
      });
    }
  };

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
  const handleRef = (node: HTMLDivElement) => {
    if (node) {
      Object.defineProperty(node.firstChild, 'clientHeight', {
        configurable: true,
        value: 200,
      });
    }
  };

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
