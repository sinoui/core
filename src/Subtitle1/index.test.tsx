import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Subtitle1 from './index';

/**
 * Subtitle1组件单元测试
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Subtitle1 as="div">这是一个文字。</Subtitle1>
      </ThemeProvider>,
    );

    const text = container.querySelector('div');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('通过 gutterBottom 指定下边距', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Subtitle1 gutterBottom>这是一个文字。</Subtitle1>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-typography--gutter-bottom');
    expect(text).toHaveTextContent('这是一个文字。');
  });
  it('ref 指向根元素', () => {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Subtitle1 data-testid="typo" ref={ref}>
          这是一个文字。
        </Subtitle1>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toEqual(ref.current);
  });
  it('设置align文本对齐方式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Subtitle1 data-testid="typo" align="center">
          这是一个文字。
        </Subtitle1>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toHaveStyle(`text-align:center`);
  });
});

/**
 * Subtitle1组件快照测试
 */
describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Subtitle1>Subtitle1</Subtitle1>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Subtitle1 as="h2">Subtitle1</Subtitle1>
          <Subtitle1 align="center">Subtitle1</Subtitle1>
          <Subtitle1 noWrap>Subtitle1</Subtitle1>
          <Subtitle1 color="success">Subtitle1</Subtitle1>
          <Subtitle1 gutterBottom>Subtitle1</Subtitle1>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Subtitle1>Subtitle1</Subtitle1>
          <Subtitle1 color="primary">Subtitle1</Subtitle1>
          <Subtitle1 color="secondary">Subtitle1</Subtitle1>
          <Subtitle1 color="textPrimary">Subtitle1</Subtitle1>
          <Subtitle1 color="textSecondary">Subtitle1</Subtitle1>
          <Subtitle1 color="error">Subtitle1</Subtitle1>
          <Subtitle1 color="warning">Subtitle1</Subtitle1>
          <Subtitle1 color="success">Subtitle1</Subtitle1>
          <Subtitle1 color="info">Subtitle1</Subtitle1>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
