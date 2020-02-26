import React from 'react';
// import renderer from 'react-test-renderer';
// import 'jest-styled-components';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './TestWrapper';
import H1 from '@sinoui/core/H1';
import H2 from '@sinoui/core/H2';
import Body2 from '@sinoui/core/Body2';
import Typography from '@sinoui/core/Typography';

/**
 * 文字排版
 */
describe('文字排版 单元测试', () => {
  afterEach(cleanup);

  test('测试className属性', async () => {
    const { container } = render(
      <TestWrapper>
        <H1>H1</H1>
        <H2>H2</H2>
        <Body2>Body2</Body2>
      </TestWrapper>,
    );

    const text = container.querySelector('.sinoui-typography-h1');
    expect(text).toHaveTextContent('H1');

    const text2 = container.querySelector('.sinoui-typography-h2');
    expect(text2).toHaveTextContent('H2');

    const text3 = container.querySelector('.sinoui-typography-body2');
    expect(text3).toHaveTextContent('Body2');
  });
  test('测试DOM元素', async () => {
    const { container } = render(
      <TestWrapper>
        <H1>H1</H1>
      </TestWrapper>,
    );

    const test = container.querySelector('h1');
    expect(test).toHaveTextContent('H1');
  });
  test('测试设置as属性的DOM元素', async () => {
    const { container } = render(
      <TestWrapper>
        <H1 as="h6">H1</H1>
      </TestWrapper>,
    );

    const test = container.querySelector('h6');
    expect(test).toHaveTextContent('H1');
  });
  test('测试Typography,默认type属性', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Typography>H1</Typography>
      </TestWrapper>,
    );

    const test = getByTestId('typography').getAttribute('type');
    expect(test).toEqual('body2');
  });
  test('测试Typography,设置type属性', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Typography type="body1">H1</Typography>
      </TestWrapper>,
    );

    const test = getByTestId('typography').getAttribute('type');
    expect(test).toEqual('body1');
  });
  test('测试gutterBottom属性', async () => {
    const { container } = render(
      <TestWrapper>
        <H1>H1</H1>
        <Body2 gutterBottom>Body2</Body2>
        <H1 gutterBottom>H2</H1>
      </TestWrapper>,
    );

    const test = container.querySelector('.sinoui-typography--gutterBottom');
    expect(test).toHaveTextContent('H2');
  });
  test('测试paragraph属性', async () => {
    const { container } = render(
      <TestWrapper>
        <H1>H1</H1>
        <H2 paragraph>H1</H2>
        <Body2 paragraph>Body2</Body2>
      </TestWrapper>,
    );

    const test = container.querySelector('.sinoui-typography--paragraph');
    expect(test).toHaveTextContent('Body2');
  });
});
