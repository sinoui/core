import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from '../utils/TestWrapper';
import Subtitle2 from './index';

/**
 * Subtitle2组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <TestWrapper>
        <Subtitle2 as="div">这是一个文字。</Subtitle2>
      </TestWrapper>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <TestWrapper>
        <Subtitle2 gutterBottom>这是一个文字。</Subtitle2>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Subtitle2 data-testid="typo" ref={ref}>
          这是一个文字。
        </Subtitle2>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
  it('其它属性传递给根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Subtitle2 data-testid="typo" as="div" ref={ref}>
          这是一个文字。
        </Subtitle2>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
});

/**
 * Subtitle2组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Subtitle2>Subtitle2</Subtitle2>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Subtitle2 as="h2">Subtitle2</Subtitle2>
          <Subtitle2 align="center">Subtitle2</Subtitle2>
          <Subtitle2 noWrap>Subtitle2</Subtitle2>
          <Subtitle2 color="success">Subtitle2</Subtitle2>
          <Subtitle2 gutterBottom>Subtitle2</Subtitle2>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Subtitle2>Subtitle2</Subtitle2>
          <Subtitle2 color="primary">Subtitle2</Subtitle2>
          <Subtitle2 color="secondary">Subtitle2</Subtitle2>
          <Subtitle2 color="textPrimary">Subtitle2</Subtitle2>
          <Subtitle2 color="textSecondary">Subtitle2</Subtitle2>
          <Subtitle2 color="error">Subtitle2</Subtitle2>
          <Subtitle2 color="warning">Subtitle2</Subtitle2>
          <Subtitle2 color="success">Subtitle2</Subtitle2>
          <Subtitle2 color="info">Subtitle2</Subtitle2>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
