import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Typography from '@sinoui/core/Typography';
import Link from '@sinoui/core/Link';

/**
 * Link组件单元测试
 */
describe('链接组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Typography>
            <Link href="/?path=/story/typography--基本组件使用">Link</Link>
            <Link href="/?path=/story/typography--设置属性">Link-1</Link>
            <Link href="/?path=/story/typography--设置颜色" color="primary">
              Link-2
            </Link>
          </Typography>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('指定根元素', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Typography>
            <Link href="/?path=/story/typography--基本组件使用" component="a">
              Link
            </Link>
            <Link href="/?path=/story/typography--设置属性" component="div">
              Link-1
            </Link>
            <Link
              href="/?path=/story/typography--设置颜色"
              color="primary"
              component="p"
            >
              Link-2
            </Link>
          </Typography>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('指定颜色', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Typography>
            <Link href="/?path=/story/typography--设置颜色" color="primary">
              color=primary
            </Link>
            <Link href="/?path=/story/typography--设置颜色" color="warning">
              color=warning
            </Link>
            <Link href="/?path=/story/typography--设置颜色" color="success">
              color=success
            </Link>
          </Typography>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
