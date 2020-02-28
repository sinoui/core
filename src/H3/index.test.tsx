import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from '../utils/TestWrapper';
import H3 from './index';

/**
 * H3组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <TestWrapper>
        <H3 as="div">这是一个文字。</H3>
      </TestWrapper>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <TestWrapper>
        <H3 gutterBottom>这是一个文字。</H3>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <H3 data-testid="typo" ref={ref}>
          这是一个文字。
        </H3>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
  it('其它属性传递给根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <H3 data-testid="typo" as="div" ref={ref}>
          这是一个文字。
        </H3>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
});

/**
 * H3组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H3>H3</H3>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H3 as="h2">H3</H3>
          <H3 align="center">H3</H3>
          <H3 noWrap>H3</H3>
          <H3 color="success">H3</H3>
          <H3 gutterBottom>H3</H3>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H3>H3</H3>
          <H3 color="primary">H3</H3>
          <H3 color="secondary">H3</H3>
          <H3 color="textPrimary">H3</H3>
          <H3 color="textSecondary">H3</H3>
          <H3 color="error">H3</H3>
          <H3 color="warning">H3</H3>
          <H3 color="success">H3</H3>
          <H3 color="info">H3</H3>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
