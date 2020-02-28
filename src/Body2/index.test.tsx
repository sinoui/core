import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from '../utils/TestWrapper';
import Body2 from './index';

/**
 * Body2组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <TestWrapper>
        <Body2 as="div">这是一个文字。</Body2>
      </TestWrapper>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 paragraphy 指定下边距', () => {
    const { container } = render(
      <TestWrapper>
        <Body2 paragraph>这是一个文字。</Body2>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--paragraph');
    expect(text).toHaveTextContent('这是一个文字。');
  });

  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Body2 data-testid="typo" ref={ref}>
          这是一个文字。
        </Body2>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
  it('其它属性传递给根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Body2 data-testid="typo" as="div" ref={ref}>
          这是一个文字。
        </Body2>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
});

/**
 * Body2组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Body2>Body2</Body2>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Body2 as="h2">Body2</Body2>
          <Body2 align="center">Body2</Body2>
          <Body2 noWrap>Body2</Body2>
          <Body2 color="success">Body2</Body2>
          <Body2 paragraphy>Body2</Body2>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Body2>Body2</Body2>
          <Body2 color="primary">Body2</Body2>
          <Body2 color="secondary">Body2</Body2>
          <Body2 color="textPrimary">Body2</Body2>
          <Body2 color="textSecondary">Body2</Body2>
          <Body2 color="error">Body2</Body2>
          <Body2 color="warning">Body2</Body2>
          <Body2 color="success">Body2</Body2>
          <Body2 color="info">Body2</Body2>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
