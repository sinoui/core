import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Body1 from './index';

/**
 * Body1组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Body1 as="div">这是一个文字。</Body1>
      </ThemeProvider>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 paragraphy 指定下边距', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Body1 paragraph>这是一个文字。</Body1>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-typography--paragraph');
    expect(text).toHaveTextContent('这是一个文字。');
  });

  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Body1 data-testid="typo" ref={ref}>
          这是一个文字。
        </Body1>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toEqual(ref.current);
  });
  it('设置align文本对齐方式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Body1 data-testid="typo" align="center">
          这是一个文字。
        </Body1>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toHaveStyle(`text-align:center`);
  });
});

/**
 * Body1组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Body1>Body1</Body1>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Body1 as="h2">Body1</Body1>
          <Body1 align="center">Body1</Body1>
          <Body1 noWrap>Body1</Body1>
          <Body1 color="success">Body1</Body1>
          <Body1 paragraph>Body1</Body1>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Body1>Body1</Body1>
          <Body1 color="primary">Body1</Body1>
          <Body1 color="secondary">Body1</Body1>
          <Body1 color="textPrimary">Body1</Body1>
          <Body1 color="textSecondary">Body1</Body1>
          <Body1 color="error">Body1</Body1>
          <Body1 color="warning">Body1</Body1>
          <Body1 color="success">Body1</Body1>
          <Body1 color="info">Body1</Body1>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
