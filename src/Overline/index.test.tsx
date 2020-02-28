import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from '../utils/TestWrapper';
import Overline from './index';

/**
 * Overline组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <TestWrapper>
        <Overline as="div">这是一个文字。</Overline>
      </TestWrapper>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });

  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Overline data-testid="typo" ref={ref}>
          这是一个文字。
        </Overline>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
  it('其它属性传递给根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Overline data-testid="typo" as="div" ref={ref}>
          这是一个文字。
        </Overline>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
});

/**
 * Overline组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Overline>Overline</Overline>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Overline as="h2">Overline</Overline>
          <Overline align="center">Overline</Overline>
          <Overline noWrap>Overline</Overline>
          <Overline color="success">Overline</Overline>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Overline>Overline</Overline>
          <Overline color="primary">Overline</Overline>
          <Overline color="secondary">Overline</Overline>
          <Overline color="textPrimary">Overline</Overline>
          <Overline color="textSecondary">Overline</Overline>
          <Overline color="error">Overline</Overline>
          <Overline color="warning">Overline</Overline>
          <Overline color="success">Overline</Overline>
          <Overline color="info">Overline</Overline>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
