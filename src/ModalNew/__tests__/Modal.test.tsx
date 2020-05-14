import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../Modal';

afterEach(cleanup);

it('打开模态框', () => {
  const { getByTestId } = render(
    <Modal open>
      <div data-testid="content">内容</div>
    </Modal>,
  );

  expect(getByTestId('content')).toBeInTheDocument();
});

it('关闭模态框', () => {
  const { queryByTestId } = render(
    <Modal open={false}>
      <div data-testid="content">内容</div>
    </Modal>,
  );

  expect(queryByTestId('content')).toBe(null);
});

describe('在指定容器中显示模态框', () => {
  it('DOM元素', () => {
    const container = document.createElement('div');
    document.body.append(container);

    const { getByTestId } = render(
      <Modal open container={container}>
        <div data-testid="content" />
      </Modal>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('ref', () => {
    const container = document.createElement('div');
    document.body.append(container);
    const containerRef = React.createRef<
      HTMLElement
    >() as React.MutableRefObject<HTMLElement>;
    containerRef.current = container;

    const { getByTestId } = render(
      <Modal open container={containerRef}>
        <div data-testid="content" />
      </Modal>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('ref为空', () => {
    const containerRef = React.createRef<
      HTMLElement
    >() as React.MutableRefObject<HTMLElement>;

    const { getByTestId } = render(
      <Modal open container={containerRef}>
        <div data-testid="content" />
      </Modal>,
    );

    expect(getByTestId('content')).toBeInTheDocument();
  });

  it('() => dom元素', () => {
    const container = document.createElement('div');
    document.body.append(container);

    const { getByTestId } = render(
      <Modal open container={() => container}>
        <div data-testid="content" />
      </Modal>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('() => ref', () => {
    const container = document.createElement('div');
    document.body.append(container);
    const containerRef = React.createRef<
      HTMLElement
    >() as React.MutableRefObject<HTMLElement>;
    containerRef.current = container;

    const { getByTestId } = render(
      <Modal open container={() => containerRef}>
        <div data-testid="content" />
      </Modal>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('() => null', () => {
    const { getByTestId } = render(
      <Modal open container={() => null}>
        <div data-testid="content" />
      </Modal>,
    );

    expect(getByTestId('content')).toBeInTheDocument();
  });
});
