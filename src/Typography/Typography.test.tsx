import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from '../utils/TestWrapper';
import Typography from './Typography';

describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('渲染不同类型的文字排版', () => {
    const { getByTestId, container } = render(
      <TestWrapper>
        <Typography data-testid="typo" type="h2">
          这是一个文字。
        </Typography>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--h2');
    expect(text).toHaveTextContent('这是一个文字。');

    const test = getByTestId('typo').getAttribute('type');
    expect(test).toEqual('h2');
  });
  it('默认渲染body2文字排版', () => {
    const { container } = render(
      <TestWrapper>
        <Typography data-testid="typo">这是一个文字。</Typography>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toHaveClass('sinoui-typography--body2');
  });

  it('指定不同的根元素', () => {
    const { container } = render(
      <TestWrapper>
        <Typography as="div">这是一个文字。</Typography>
      </TestWrapper>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <TestWrapper>
        <Typography gutterBottom type="h1">
          这是一个文字。
        </Typography>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 paragraphy 指定下边距', () => {
    const { container } = render(
      <TestWrapper>
        <Typography paragraph>这是一个文字。</Typography>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography--paragraph');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Typography data-testid="typo" ref={ref}>
          这是一个文字。
        </Typography>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
  it('其它属性传递给根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <TestWrapper>
        <Typography data-testid="typo" as="div" ref={ref}>
          这是一个文字。
        </Typography>
      </TestWrapper>,
    );

    const text = container.firstChild;
    expect(text && text.firstChild).toEqual(ref.current);
  });
});
