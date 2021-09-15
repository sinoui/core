/**
 * @jest-environment jsdom
 */
import { render, fireEvent, cleanup } from '@testing-library/react';
import React, { useRef, createRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useClickAwayListener from '../useClickAwayListener';

afterEach(cleanup);

const ClickAwayClickListenerDemo = ({ callback }: { callback: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickAwayListener([ref], callback);
  return <div data-testid="demo" ref={ref} />;
};

it('点击元素外区域，执行回调函数', () => {
  const callback = jest.fn();
  render(<ClickAwayClickListenerDemo callback={callback} />);

  fireEvent.click(document.body);

  expect(callback).toBeCalled();
});

it('点击指定元素，不执行回调函数', () => {
  const callback = jest.fn();
  const { getByTestId } = render(
    <ClickAwayClickListenerDemo callback={callback} />,
  );

  fireEvent.click(getByTestId('demo'));

  expect(callback).not.toBeCalled();
});

const MultiTargetsClickAwayClickListenerDemo = ({
  callback,
}: {
  callback: any;
}) => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  useClickAwayListener([ref1, ref2], callback);
  return (
    <>
      <div data-testid="demo1" ref={ref1} />
      <div data-testid="demo2" ref={ref2} />
    </>
  );
};

it('可以指定多个元素', () => {
  const callback = jest.fn();
  const { getByTestId } = render(
    <MultiTargetsClickAwayClickListenerDemo callback={callback} />,
  );

  fireEvent.click(getByTestId('demo1'));
  expect(callback).not.toBeCalled();

  fireEvent.click(getByTestId('demo2'));
  expect(callback).not.toBeCalled();

  fireEvent.click(document.body);
  expect(callback).toBeCalled();
});

it('不指定元素时，不调用回调函数', () => {
  const callback = jest.fn();
  renderHook(() => useClickAwayListener([], callback));

  fireEvent.click(document.body);
  expect(callback).not.toBeCalled();
});

it('指定ref不引用元素时，不调用回调函数', () => {
  const callback = jest.fn();
  const ref = createRef<HTMLElement>();
  renderHook(() => useClickAwayListener([ref], callback));

  fireEvent.click(document.body);
  expect(callback).not.toBeCalled();
});
