import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import H2 from './index';

/**
 * H2组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H2 as="div">这是一个文字。</H2>
      </ThemeProvider>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H2 gutterBottom>这是一个文字。</H2>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H2 data-testid="typo" ref={ref}>
          这是一个文字。
        </H2>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toEqual(ref.current);
  });
  it('设置align文本对齐方式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H2 data-testid="typo" align="center">
          这是一个文字。
        </H2>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toHaveStyle(`text-align:center`);
  });
});

/**
 * H2组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <H2>H2</H2>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <H2 as="h2">H2</H2>
          <H2 align="center">H2</H2>
          <H2 noWrap>H2</H2>
          <H2 color="success">H2</H2>
          <H2 gutterBottom>H2</H2>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <H2>H2</H2>
          <H2 color="primary">H2</H2>
          <H2 color="secondary">H2</H2>
          <H2 color="textPrimary">H2</H2>
          <H2 color="textSecondary">H2</H2>
          <H2 color="error">H2</H2>
          <H2 color="warning">H2</H2>
          <H2 color="success">H2</H2>
          <H2 color="info">H2</H2>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
