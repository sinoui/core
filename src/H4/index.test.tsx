import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from '../utils/TestWrapper';
import H4 from './index';

/**
 * H4组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <TestWrapper>
        <H4 as="div">这是一个文字。</H4>
      </TestWrapper>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <TestWrapper>
        <H4 gutterBottom>这是一个文字。</H4>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <H4 data-testid="typo" ref={ref}>
          这是一个文字。
        </H4>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
  it('其它属性传递给根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <H4 data-testid="typo" as="div" ref={ref}>
          这是一个文字。
        </H4>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
});

/**
 * H4组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H4>H4</H4>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H4 as="h2">H4</H4>
          <H4 align="center">H4</H4>
          <H4 noWrap>H4</H4>
          <H4 color="success">H4</H4>
          <H4 gutterBottom>H4</H4>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H4>H4</H4>
          <H4 color="primary">H4</H4>
          <H4 color="secondary">H4</H4>
          <H4 color="textPrimary">H4</H4>
          <H4 color="textSecondary">H4</H4>
          <H4 color="error">H4</H4>
          <H4 color="warning">H4</H4>
          <H4 color="success">H4</H4>
          <H4 color="info">H4</H4>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
