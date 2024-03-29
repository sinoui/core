/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import styled from 'styled-components';
import colorCss from '@sinoui/core/utils/colorCss';
import TestWrapper from './TestWrapper';

const Comp1 = styled.p`
  ${colorCss('color', 'textPrimary')}
`;

const Comp2 = styled.p`
  ${colorCss(['fill', 'color', 'backgroundColor', 'borderColor'], 'primary')}
`;

const Comp3 = styled.p`
  ${colorCss(['border-color', 'color'], 'primary')}
`;

const Comp4 = styled.p`
  ${colorCss('color')}
`;

describe('colorCss 单元测试', () => {
  afterEach(cleanup);

  test('测试color指定颜色primary', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp1 data-testid="comp1" color="primary" />
      </TestWrapper>,
    );

    const text = getByTestId('comp1');
    expect(text).toHaveStyle(`color:#3f51b5`);
  });

  test('测试color指定颜色secondary', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp1 data-testid="comp1" color="secondary" />
      </TestWrapper>,
    );

    const text = getByTestId('comp1');
    expect(text).toHaveStyle(`color:#f50057`);
  });

  test('测试color指定颜色textPrimary', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp1 data-testid="comp1" color="textPrimary" />
      </TestWrapper>,
    );

    const text = getByTestId('comp1');
    expect(text).toHaveStyle(`color:rgba(0,0,0,0.87)`);
  });

  test('测试color指定颜色textSecondary', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp1 data-testid="comp1" color="textSecondary" />
      </TestWrapper>,
    );

    const text = getByTestId('comp1');
    expect(text).toHaveStyle(`color:rgba(0,0,0,0.6)`);
  });

  test('测试color指定css属性', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp2 data-testid="comp2" />
      </TestWrapper>,
    );

    const text = getByTestId('comp2');
    expect(text).toHaveStyle(`fill:#3f51b5`);
  });

  test('测试同时指定多个css属性', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp3 data-testid="comp3" />
      </TestWrapper>,
    );

    const text = getByTestId('comp3');
    expect(text).toHaveStyle(`border-color:#3f51b5`);
  });

  test('测试使用默认指定的颜色值', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp1 data-testid="comp1" />
      </TestWrapper>,
    );

    const text = getByTestId('comp1');
    expect(text).toHaveStyle(`color: rgba(0,0,0,0.87)`);
  });

  test('测试没有默认值，并不指定color属性，应没有颜色样式', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Comp4 data-testid="comp3" />
      </TestWrapper>,
    );

    const text = getByTestId('comp3');
    expect(text.style.color).toBeFalsy();
  });
});
