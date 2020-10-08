import React, { createRef } from 'react';
import { render, cleanup } from '@testing-library/react';
import transitions from '@sinoui/theme/transitions';
import { create } from 'react-test-renderer';
import Grow from './Grow';

afterEach(cleanup);

it('初始化展现', () => {
  const { getByTestId } = render(
    <Grow in timeout={100}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );
  expect(getByTestId('grow')).toHaveStyle('opacity: 1');
  expect(getByTestId('grow')).toHaveStyle('transform: scale(1, 1)');
  expect(getByTestId('grow')).not.toHaveStyle('visibility: hidden');
  expect(getByTestId('grow')).toHaveStyle(
    `transition: ${[
      transitions.create('opacity', {
        duration: 100,
      }),
      transitions.create('transform', { duration: 66.6 }),
    ].join(', ')}`,
  );
});

it('初始隐藏', () => {
  const { getByTestId } = render(
    <Grow in={false} timeout={100}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );
  expect(getByTestId('grow')).toHaveStyle('visibility: hidden');
  expect(getByTestId('grow')).toHaveStyle('opacity: 0');
  expect(getByTestId('grow')).toHaveStyle('transform: scale(0.75, 0.5625)');
});

it('展现 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <Grow in timeout={100}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );

  rerender(
    <Grow in={false} timeout={100}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );

  expect(getByTestId('grow')).toHaveStyle('opacity: 0');
  expect(getByTestId('grow')).toHaveStyle('transform: scale(0.75, 0.5625)');
  expect(getByTestId('grow')).toHaveStyle(
    `transition: ${[
      transitions.create('opacity', {
        duration: 100,
      }),
      transitions.create('transform', { duration: 66.6, delay: 33.3 }),
    ].join(', ')}`,
  );
});

it('隐藏 -> 展现', () => {
  const { getByTestId, rerender } = render(
    <Grow in={false} timeout={100}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );

  rerender(
    <Grow in timeout={100}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );

  expect(getByTestId('grow')).toHaveStyle('opacity: 1');
  expect(getByTestId('grow')).toHaveStyle('transform: scale(1, 1)');
});

describe('auto timeout', () => {
  it('自动监控过渡结束', () => {
    const { getByTestId, rerender } = render(
      <Grow in>
        <div data-testid="grow">测试</div>
      </Grow>,
    );

    rerender(
      <Grow in={false}>
        <div data-testid="grow">测试</div>
      </Grow>,
    );

    expect(getByTestId('grow')).toHaveStyle('opacity: 0');
    expect(getByTestId('grow')).toHaveStyle('transform: scale(0.75, 0.5625)');
  });
});

it('onEnter', () => {
  const onEnter = jest.fn();
  render(
    <Grow in onEnter={onEnter}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );

  expect(onEnter).toHaveBeenCalled();
});

it('onExit', () => {
  const onExit = jest.fn();
  const { rerender } = render(
    <Grow in onExit={onExit}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );

  expect(onExit).not.toHaveBeenCalled();

  rerender(
    <Grow in={false} onExit={onExit}>
      <div data-testid="grow">测试</div>
    </Grow>,
  );
  expect(onExit).toHaveBeenCalled();
});

it('style', () => {
  const { getByTestId } = render(
    <Grow in style={{ backgroundColor: 'yellow' }}>
      <div data-testid="grow" style={{ color: 'red' }}>
        测试
      </div>
    </Grow>,
  );
  expect(getByTestId('grow')).toHaveStyle(
    'color: red; background-color: yellow',
  );
});

it('子元素属性', () => {
  const ref = createRef<HTMLDivElement>();
  const growRef = createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <Grow in ref={growRef} className="div121">
      <div data-testid="grow" ref={ref} id="div123">
        测试
      </div>
    </Grow>,
  );

  expect(ref.current).toBe(getByTestId('grow'));
  expect(growRef.current).toBe(getByTestId('grow'));
  expect(getByTestId('grow')).toHaveAttribute('id', 'div123');
  expect(getByTestId('grow')).toHaveClass('div121');
});

describe('快照测试', () => {
  it('展现', () => {
    const tree = create(
      <Grow in>
        <div>测试</div>
      </Grow>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
