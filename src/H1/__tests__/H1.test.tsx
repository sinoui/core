import React from 'react';
import renderer from 'react-test-renderer';
// import 'jest-styled-components';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './TestWrapper';
import Typography from '@sinoui/core/Typography';
import H1 from '@sinoui/core/H1';
import H2 from '@sinoui/core/H2';
import H3 from '@sinoui/core/H3';
import H4 from '@sinoui/core/H4';
import H5 from '@sinoui/core/H5';
import H6 from '@sinoui/core/H6';
import Subtitle1 from '@sinoui/core/Subtitle1';
import Subtitle2 from '@sinoui/core/Subtitle2';
import Body1 from '@sinoui/core/Body1';
import Body2 from '@sinoui/core/Body2';
import Caption from '@sinoui/core/Caption';
import Overline from '@sinoui/core/Overline';

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

describe('文字排版 快照测试', () => {
  it('基本文字排版', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H1>H1</H1>
          <H2>H1</H2>
          <H3>H1</H3>
          <H4>H1</H4>
          <H5>H1</H5>
          <H6>H1</H6>
          <Subtitle1>H1</Subtitle1>
          <Subtitle2>H1</Subtitle2>
          <Body1>H1</Body1>
          <Body2>H1</Body2>
          <Caption>H1</Caption>
          <Overline>H1</Overline>
          <Typography>H1</Typography>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置属性', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <H1 as="h2">H1</H1>
          <H1 align="center">H1</H1>
          <H1 noWrap>H1</H1>
          <H1 color="success">H1</H1>
          <H1 gutterBottom>H1</H1>
          <Body2 paragraph>Body2</Body2>
          <Typography type="body1">Typography</Typography>
          <Typography type="body1" as="p">
            Typography
          </Typography>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('颜色设置', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Typography>Typography</Typography>
          <Typography color="primary">Typography</Typography>
          <Typography color="secondary">Typography</Typography>
          <Typography color="textPrimary">Typography</Typography>
          <Typography color="textSecondary">Typography</Typography>
          <Typography color="error">Typography</Typography>
          <Typography color="warning">Typography</Typography>
          <Typography color="success">Typography</Typography>
          <Typography color="info">Typography</Typography>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
