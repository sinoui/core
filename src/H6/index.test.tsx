/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import H6 from './index';

/**
 * H6组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H6 as="div">这是一个文字。</H6>
      </ThemeProvider>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H6 gutterBottom>这是一个文字。</H6>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H6 data-testid="typo" ref={ref}>
          这是一个文字。
        </H6>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toEqual(ref.current);
  });
  it('设置align文本对齐方式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H6 data-testid="typo" align="center">
          这是一个文字。
        </H6>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toHaveStyle(`text-align:center`);
  });
});

/**
 * H6组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <H6>H6</H6>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <H6 as="h2">H6</H6>
          <H6 align="center">H6</H6>
          <H6 noWrap>H6</H6>
          <H6 color="success">H6</H6>
          <H6 gutterBottom>H6</H6>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <H6>H6</H6>
          <H6 color="primary">H6</H6>
          <H6 color="secondary">H6</H6>
          <H6 color="textPrimary">H6</H6>
          <H6 color="textSecondary">H6</H6>
          <H6 color="error">H6</H6>
          <H6 color="warning">H6</H6>
          <H6 color="success">H6</H6>
          <H6 color="info">H6</H6>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
