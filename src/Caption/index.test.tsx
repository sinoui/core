/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Caption from './index';

/**
 * Caption组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Caption as="div">这是一个文字。</Caption>
      </ThemeProvider>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });

  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Caption data-testid="typo" ref={ref}>
          这是一个文字。
        </Caption>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toEqual(ref.current);
  });
  it('设置align文本对齐方式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Caption data-testid="typo" align="center">
          这是一个文字。
        </Caption>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toHaveStyle(`text-align:center`);
  });
});

/**
 * Caption组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Caption>Caption</Caption>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Caption as="h2">Caption</Caption>
          <Caption align="center">Caption</Caption>
          <Caption noWrap>Caption</Caption>
          <Caption color="success">Caption</Caption>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Caption>Caption</Caption>
          <Caption color="primary">Caption</Caption>
          <Caption color="secondary">Caption</Caption>
          <Caption color="textPrimary">Caption</Caption>
          <Caption color="textSecondary">Caption</Caption>
          <Caption color="error">Caption</Caption>
          <Caption color="warning">Caption</Caption>
          <Caption color="success">Caption</Caption>
          <Caption color="info">Caption</Caption>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
