import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { transitions } from '@sinoui/theme';
import Slide, { getTranslate } from './Slide';

afterEach(cleanup);

jest.useFakeTimers();

it('初始出现', () => {
  const { getByTestId } = render(
    <Slide in>
      <div data-testid="slide">测试</div>
    </Slide>,
  );

  expect(getByTestId('slide')).not.toHaveStyle('visibility:hidden');
  expect(getByTestId('slide')).toHaveStyle('transform: none');
  expect(getByTestId('slide')).toHaveStyle(
    `transition: ${transitions.create('transform', {
      duration: transitions.duration.enteringScreen,
      easing: transitions.easing.easeOut,
    })}`,
  );
});

it('初始隐藏', () => {
  const { getByTestId } = render(
    <Slide in={false}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );

  expect(getByTestId('slide')).toHaveStyle('visibility:hidden');
});

it('显示 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <Slide in>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  Object.defineProperty(getByTestId('slide'), 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      top: 20,
      height: 20,
    }),
  });

  rerender(
    <Slide in={false}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  expect(getByTestId('slide').style.transform).toBe('translateY(-40px)');
  expect(getByTestId('slide')).toHaveStyle(
    `transition: ${transitions.create('transform', {
      duration: transitions.duration.leavingScreen,
      easing: transitions.easing.sharp,
    })}`,
  );

  jest.runAllTimers();
  expect(getByTestId('slide')).toHaveStyle('transform: none');
  expect(getByTestId('slide')).toHaveStyle('transition: none');
});

it('隐藏 -> 显示', () => {
  const onEnter = jest
    .fn()
    .mockImplementation((node) =>
      expect(node).toHaveStyle('transform: translateY(-40px)'),
    );

  const { getByTestId, rerender } = render(
    <Slide in={false} onEnter={onEnter}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  Object.defineProperty(getByTestId('slide'), 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      top: 20,
      height: 20,
    }),
  });
  rerender(
    <Slide in onEnter={onEnter}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );

  expect(onEnter).toBeCalled();
  expect(getByTestId('slide')).toHaveStyle('transform: none');
  expect(getByTestId('slide')).toHaveStyle(
    `transition: ${transitions.create('transform', {
      duration: transitions.duration.enteringScreen,
      easing: transitions.easing.easeOut,
    })}`,
  );
});

it('onEnter', () => {
  const onEnter = jest.fn();
  render(
    <Slide in onEnter={onEnter}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  expect(onEnter).toBeCalled();
});

it('onEntering', () => {
  const onEntering = jest.fn();
  render(
    <Slide in onEntering={onEntering}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  expect(onEntering).toBeCalled();
});

it('onExit', () => {
  const onExit = jest.fn();
  const { rerender } = render(
    <Slide in onExit={onExit}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  rerender(
    <Slide in={false} onExit={onExit}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  expect(onExit).toBeCalled();
});

it('onExited', () => {
  const onExited = jest.fn();
  const { rerender } = render(
    <Slide in onExited={onExited}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  rerender(
    <Slide in={false} onExited={onExited}>
      <div data-testid="slide">测试</div>
    </Slide>,
  );
  jest.runAllTimers();
  expect(onExited).toBeCalled();
});

describe('direcction', () => {
  it('left', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 200,
      configurable: true,
    });
    const node = document.createElement('div');
    Object.defineProperty(node, 'getBoundingClientRect', {
      value: () => ({ left: 20 }),
      configurable: true,
    });

    expect(getTranslate(node, 'left')).toBe('translateX(180px)');
  });

  it('right', () => {
    const node = document.createElement('div');
    Object.defineProperty(node, 'getBoundingClientRect', {
      value: () => ({ left: 20, width: 100 }),
      configurable: true,
    });

    expect(getTranslate(node, 'right')).toBe('translateX(-120px)');
  });

  it('down', () => {
    const node = document.createElement('div');
    Object.defineProperty(node, 'getBoundingClientRect', {
      value: () => ({ top: 20, height: 30 }),
      configurable: true,
    });

    expect(getTranslate(node, 'down')).toBe('translateY(-50px)');
  });

  it('up', () => {
    Object.defineProperty(window, 'innerHeight', {
      value: 300,
      configurable: true,
    });
    const node = document.createElement('div');
    Object.defineProperty(node, 'getBoundingClientRect', {
      value: () => ({ top: 90 }),
      configurable: true,
    });

    expect(getTranslate(node, 'up')).toBe('translateY(210px)');
  });
});

it('ref', () => {
  const outerRef = React.createRef<HTMLElement>();
  const innerRef = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <Slide in data-testid="slide" ref={outerRef}>
      <div ref={innerRef}>测试</div>
    </Slide>,
  );

  expect(outerRef.current).toBe(getByTestId('slide'));
  expect(innerRef.current).toBe(getByTestId('slide'));
});

it('style', () => {
  const { getByTestId } = render(
    <Slide
      in
      data-testid="slide"
      style={{
        color: 'red',
      }}
    >
      <div style={{ backgroundColor: 'yellow' }}>测试</div>
    </Slide>,
  );

  expect(getByTestId('slide')).toHaveStyle(
    'color: red; background-color: yellow',
  );
});

it('子元素属性', () => {
  const { getByTestId } = render(
    <Slide in data-testid="slide">
      <div className="slide">测试</div>
    </Slide>,
  );

  expect(getByTestId('slide')).toHaveClass('slide');
});
