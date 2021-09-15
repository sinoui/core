/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { transitions } from '@sinoui/theme';
import '@testing-library/jest-dom';
import { create } from 'react-test-renderer';
import Zoom from './Zoom';

jest.useFakeTimers();

it('初始展现', () => {
  const { getByTestId } = render(
    <Zoom in data-testid="zoom">
      <div>测试</div>
    </Zoom>,
  );

  expect(getByTestId('zoom')).toHaveStyle('transform: none');
  expect(getByTestId('zoom')).not.toHaveStyle('visibility: hidden');
});

it('初始隐藏', () => {
  const { getByTestId } = render(
    <Zoom in={false} data-testid="zoom">
      <div>测试</div>
    </Zoom>,
  );

  expect(getByTestId('zoom')).toHaveStyle('transform: scale(0)');
  expect(getByTestId('zoom')).toHaveStyle('visibility: hidden');
});

it('隐藏 -> 展现', () => {
  const { getByTestId, rerender } = render(
    <Zoom in={false} data-testid="zoom">
      <div>测试</div>
    </Zoom>,
  );

  rerender(
    <Zoom in data-testid="zoom">
      <div>测试</div>
    </Zoom>,
  );

  expect(getByTestId('zoom')).toHaveStyle('transform: none');
  expect(getByTestId('zoom')).toHaveStyle(
    `transition: ${transitions.create('transform', {
      duration: transitions.duration.enteringScreen,
    })}`,
  );
});

it('展现 -> 隐藏', () => {
  const { getByTestId, rerender } = render(
    <Zoom in data-testid="zoom">
      <div>测试</div>
    </Zoom>,
  );

  rerender(
    <Zoom in={false} data-testid="zoom">
      <div>测试</div>
    </Zoom>,
  );

  expect(getByTestId('zoom')).toHaveStyle('transform: scale(0)');
  expect(getByTestId('zoom')).toHaveStyle(
    `transition: ${transitions.create('transform', {
      duration: transitions.duration.leavingScreen,
    })}`,
  );

  jest.runAllTimers();

  expect(getByTestId('zoom')).toHaveStyle('visibility: hidden');
});

it('onEnter', () => {
  const onEnter = jest.fn();
  render(
    <Zoom in onEnter={onEnter}>
      <div>测试</div>
    </Zoom>,
  );
  expect(onEnter).toBeCalled();
});

it('onExit', () => {
  const onExit = jest.fn();
  const { rerender } = render(
    <Zoom in onExit={onExit}>
      <div>测试</div>
    </Zoom>,
  );

  rerender(
    <Zoom in={false} onExit={onExit}>
      <div>测试</div>
    </Zoom>,
  );

  expect(onExit).toBeCalled();
});

it('ref', () => {
  const outerRef = React.createRef<HTMLElement>();
  const innerRef = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <Zoom in data-testid="zoom" ref={outerRef}>
      <div ref={innerRef}>测试</div>
    </Zoom>,
  );

  expect(outerRef.current).toBe(getByTestId('zoom'));
  expect(innerRef.current).toBe(getByTestId('zoom'));
});

it('style', () => {
  const { getByTestId } = render(
    <Zoom
      in
      data-testid="zoom"
      style={{
        color: 'red',
      }}
    >
      <div style={{ backgroundColor: 'yellow' }}>测试</div>
    </Zoom>,
  );

  expect(getByTestId('zoom')).toHaveStyle(
    'color: red; background-color: yellow',
  );
});

it('子元素属性', () => {
  const { getByTestId } = render(
    <Zoom in data-testid="zoom">
      <div className="zoom">测试</div>
    </Zoom>,
  );

  expect(getByTestId('zoom')).toHaveClass('zoom');
});

describe('快照测试', () => {
  it('展现', () => {
    const tree = create(
      <React.StrictMode>
        <Zoom in>
          <div>测试</div>
        </Zoom>
      </React.StrictMode>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
