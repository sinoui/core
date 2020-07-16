import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import ClickableText from '../ClickableText';

afterEach(cleanup);

it('渲染可点击本文', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClickableText data-testid="clickable-text">123</ClickableText>
    </ThemeProvider>,
  );

  const clickableText = getByTestId('clickable-text');

  expect(clickableText).toHaveStyleRule('font-size', '16px');
  expect(clickableText).toHaveStyleRule('opacity', '0.7');
});

it('选中状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClickableText selected data-testid="clickable-text">
        123
      </ClickableText>
    </ThemeProvider>,
  );

  const clickableText = getByTestId('clickable-text');

  expect(clickableText).toHaveStyleRule('opacity', '1');
});

it('指定文字大小', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClickableText data-testid="clickable-text" fontSize={36}>
        123
      </ClickableText>
    </ThemeProvider>,
  );

  const clickableText = getByTestId('clickable-text');

  expect(clickableText).toHaveStyleRule('font-size', '36px');
});

describe('镜像测试', () => {
  it('基本渲染', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClickableText>123</ClickableText>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('选中状态', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClickableText selected>123</ClickableText>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('指定文字大小', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClickableText fontSize={36}>123</ClickableText>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
