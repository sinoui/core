import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import createTypography from './createTypography';

describe('文字排版 单元测试', () => {
  afterEach(cleanup);
  it('创建字体排版组件', () => {
    const H1 = createTypography('h1', 'H1');
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H1 data-testid="typo">这是一个文字。</H1>
      </ThemeProvider>,
    );

    const test = getByTestId('typo').getAttribute('type');
    expect(test).toEqual('h1');

    const text = container.firstChild;
    expect(text).toHaveClass('sinoui-typography--h1');
  });
  it('创建的字体排版组件有固定的type', () => {
    const H1 = createTypography('h1', 'H1');
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <H1 data-testid="typo" type="h2">
          这是一个文字。
        </H1>
      </ThemeProvider>,
    );

    const test = getByTestId('typo').getAttribute('type');
    expect(test).toEqual('h1');
  });
  it('ref 正确传递给底层 Typography 组件', () => {
    const H1 = createTypography('h1', 'H1');
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <H1 data-testid="typo" ref={ref}>
          这是一个文字。
        </H1>
      </ThemeProvider>,
    );

    const text = container.firstChild;
    expect(text).toEqual(ref.current);
  });
});
