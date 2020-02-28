import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from '../utils/TestWrapper';
import H1 from './index';

/**
 * H1组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <TestWrapper>
        <H1 as="div">这是一个文字。</H1>
      </TestWrapper>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <TestWrapper>
        <H1 gutterBottom>这是一个文字。</H1>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <H1 data-testid="typo" ref={ref}>
          这是一个文字。
        </H1>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
  it('其它属性传递给根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <H1 data-testid="typo" as="div" ref={ref}>
          这是一个文字。
        </H1>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
});

/**
 * H1组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H1>H1</H1>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H1 as="h2">H1</H1>
          <H1 align="center">H1</H1>
          <H1 noWrap>H1</H1>
          <H1 color="success">H1</H1>
          <H1 gutterBottom>H1</H1>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H1>H1</H1>
          <H1 color="primary">H1</H1>
          <H1 color="secondary">H1</H1>
          <H1 color="textPrimary">H1</H1>
          <H1 color="textSecondary">H1</H1>
          <H1 color="error">H1</H1>
          <H1 color="warning">H1</H1>
          <H1 color="success">H1</H1>
          <H1 color="info">H1</H1>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
