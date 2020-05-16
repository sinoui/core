import React, { createRef } from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import transitions, { duration } from '@sinoui/theme/transitions';
import { create } from 'react-test-renderer';
import Fade from './Fade';

afterEach(cleanup);

it('初始隐藏->展现', () => {
  const { getByTestId, rerender } = render(
    <Fade in={false}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );

  expect(getByTestId('fade')).toHaveStyle('visibility: hidden;');

  rerender(
    <Fade in>
      <div data-testid="fade">测试</div>
    </Fade>,
  );

  expect(getByTestId('fade')).toHaveStyle('opacity: 1');
  expect(getByTestId('fade')).toHaveStyle(
    `transition: ${transitions.create('opacity', {
      duration: duration.enteringScreen,
    })}`,
  );
});

it('初始展现 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <Fade in>
      <div data-testid="fade">测试</div>
    </Fade>,
  );

  expect(getByTestId('fade')).not.toHaveStyle('visibility: hidden');
  expect(getByTestId('fade')).toHaveStyle('opacity: 1');

  rerender(
    <Fade in={false}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );

  expect(getByTestId('fade')).toHaveStyle('opacity: 0');
  expect(getByTestId('fade')).toHaveStyle(
    `transition: ${transitions.create('opacity', {
      duration: duration.leavingScreen,
    })}`,
  );
});

it('隐藏 -> 展现 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <Fade in>
      <div data-testid="fade">测试</div>
    </Fade>,
  );
  rerender(
    <Fade in={false}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );

  rerender(
    <Fade in>
      <div data-testid="fade">测试</div>
    </Fade>,
  );
  expect(getByTestId('fade')).toHaveStyle('opacity: 1');
  expect(getByTestId('fade')).toHaveStyle(
    `transition: ${transitions.create('opacity', {
      duration: duration.enteringScreen,
    })}`,
  );

  rerender(
    <Fade in={false}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );
  expect(getByTestId('fade')).toHaveStyle('opacity: 0');
  expect(getByTestId('fade')).toHaveStyle(
    `transition: ${transitions.create('opacity', {
      duration: duration.leavingScreen,
    })}`,
  );
});

it('onEnter', () => {
  const onEnter = jest.fn();
  render(
    <Fade in onEnter={onEnter}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );
  expect(onEnter).toHaveBeenCalled();
});

it('onExit', () => {
  const onExit = jest.fn();
  const { rerender } = render(
    <Fade in={false} onExit={onExit}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );
  expect(onExit).not.toHaveBeenCalled();

  rerender(
    <Fade in onExit={onExit}>
      <div>测试</div>
    </Fade>,
  );
  rerender(
    <Fade in={false} onExit={onExit}>
      <div>测试</div>
    </Fade>,
  );
  expect(onExit).toHaveBeenCalled();
});

it('ref', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <Fade in>
      <div data-testid="fade" ref={ref}>
        测试
      </div>
    </Fade>,
  );

  expect(ref.current).toBe(getByTestId('fade'));
});

it('style', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <Fade in>
      <div
        data-testid="fade"
        ref={ref}
        style={{
          marginTop: 10,
        }}
      >
        测试
      </div>
    </Fade>,
  );

  expect(getByTestId('fade')).toHaveStyle('margin-top: 10px');
});

it('timeout', () => {
  const { getByTestId, rerender } = render(
    <Fade in timeout={100}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );

  rerender(
    <Fade in={false} timeout={100}>
      <div data-testid="fade">测试</div>
    </Fade>,
  );

  expect(getByTestId('fade')).toHaveStyle(
    `transition: ${transitions.create('opacity', {
      duration: 100,
    })}`,
  );
});

describe('快照测试', () => {
  it('展现', () => {
    const tree = create(
      <React.StrictMode>
        <Fade in>
          <div>测试</div>
        </Fade>
      </React.StrictMode>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
