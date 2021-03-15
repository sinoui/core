import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Typography from '@sinoui/core/Typography';
import Link from '@sinoui/core/Link';
import Breadcrumb from './Breadcrumb';

/**
 * Breadcrumb组件单元测试
 */
describe('面包屑组件 单元测试', () => {
  afterEach(cleanup);

  it('测试separator元素显示', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Breadcrumb>
          <Link href="/?path=/story/typography--基本组件使用">Material-UI</Link>
          <Link href="/?path=/story/typography--设置属性">Core</Link>
          <Link href="/?path=/story/typography--设置颜色">UI</Link>
          <Typography type="body1">Breadcrumb</Typography>
        </Breadcrumb>
      </ThemeProvider>,
    );

    const text = container.querySelectorAll('.sinoui-breadcrumb-separator');
    expect(text.length).toBe(3);
  });

  it('测试是否都有li包裹', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Breadcrumb>
          <Link href="/?path=/story/typography--基本组件使用">Material-UI</Link>
          <Link href="/?path=/story/typography--设置属性">Core</Link>
          <Link href="/?path=/story/typography--设置颜色">UI</Link>
          <Typography type="body1">Breadcrumb</Typography>
        </Breadcrumb>
      </ThemeProvider>,
    );

    const text = container.querySelectorAll('.sinoui-breadcrumb-li');
    expect(text.length).toBe(4);
  });
});

describe('面包屑组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Breadcrumb>
            <Link href="/?path=/story/typography--基本组件使用">
              Material-UI
            </Link>
            <Link href="/?path=/story/typography--设置属性">Core</Link>
            <Link href="/?path=/story/typography--设置颜色">UI</Link>
            <Typography type="body1">Breadcrumb</Typography>
          </Breadcrumb>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('指定背景颜色', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Breadcrumb color="primary">
            <Link href="/?path=/story/typography--基本组件使用">
              Material-UI
            </Link>
            <Link href="/?path=/story/typography--设置属性">Core</Link>
            <Link href="/?path=/story/typography--设置颜色">UI</Link>
            <Typography type="body1">Breadcrumb</Typography>
          </Breadcrumb>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
