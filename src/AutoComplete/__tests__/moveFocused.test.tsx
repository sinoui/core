/**
 * @jest-environment jsdom
 */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import moveFocused from '../moveFocused';

afterEach(cleanup);

const Demo = () => (
  <div data-testid="container">
    <div
      tabIndex={-1}
      data-tag-index={0}
      className="sinoui-chip"
      data-testid="firstTag"
    />
    <div
      tabIndex={-1}
      data-tag-index={1}
      className="sinoui-chip"
      data-testid="secondTag"
    />
    <div
      tabIndex={-1}
      data-tag-index={2}
      className="sinoui-chip"
      data-testid="lastTag"
    />
    <input type="text" autoFocus data-testid="input" />
  </div>
);

it('焦点从输入框转移到最后一个选项标签', () => {
  const { getByTestId } = render(<Demo />);

  moveFocused(getByTestId('container'), -1);

  expect(document.activeElement).toBe(getByTestId('lastTag'));
});

it('焦点从输入框转移到第一个选项标签', () => {
  const { getByTestId } = render(<Demo />);

  moveFocused(getByTestId('container'), 1);

  expect(document.activeElement).toBe(getByTestId('firstTag'));
});

it('焦点在标签之间切换', () => {
  const { getByTestId } = render(<Demo />);

  moveFocused(getByTestId('container'), -1);
  moveFocused(getByTestId('container'), -1);

  expect(document.activeElement).toBe(getByTestId('secondTag'));

  moveFocused(getByTestId('container'), 1);
  expect(document.activeElement).toBe(getByTestId('lastTag'));
});

it('焦点从第一个选项标签切换到输入框', () => {
  const { getByTestId } = render(<Demo />);
  // 焦点移到第一个标签上
  moveFocused(getByTestId('container'), 1);

  // 焦点从第一个标签转移到输入框上
  moveFocused(getByTestId('container'), -1);

  expect(document.activeElement).toBe(getByTestId('input'));
});

it('焦点从最后一个标签切换到输入框', () => {
  const { getByTestId } = render(<Demo />);
  // 焦点移到最后一个标签上
  moveFocused(getByTestId('container'), -1);

  // 焦点从最后一个标签转移到输入框上
  moveFocused(getByTestId('container'), 1);

  expect(document.activeElement).toBe(getByTestId('input'));
});

it('跳过禁用的选项标签', () => {
  const { getByTestId } = render(
    <div data-testid="container">
      <div
        tabIndex={-1}
        data-tag-index={0}
        className="sinoui-chip"
        data-testid="firstTag"
      />
      <div
        tabIndex={-1}
        data-tag-index={1}
        className="sinoui-chip"
        data-testid="secondTag"
      />
      <div
        tabIndex={-1}
        data-tag-index={2}
        className="sinoui-chip sinoui-chip--disabled"
        data-testid="lastTag"
        role="button"
        aria-disabled="true"
      />
      <input type="text" autoFocus data-testid="input" />
    </div>,
  );

  moveFocused(getByTestId('container'), -1);

  expect(document.activeElement).toBe(getByTestId('secondTag'));
});
