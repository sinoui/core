import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Divider from '@sinoui/core/Divider';

/**
 * 分割线组件 单元测试
 */
describe('分割线组件 单元测试', () => {
  afterEach(cleanup);

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" as="div" />
      </ThemeProvider>,
    );
    expect(container.firstChild && container.firstChild.nodeName).toBe('DIV');
  });

  // it('设置水平间距', () => {
  //   const { container } = render(
  //     <ThemeProvider theme={defaultTheme}>
  //       <Divider data-testid="divider" horizontal marginHorizontal={24} />
  //     </ThemeProvider>,
  //   );
  //   expect(container.firstChild.style.marginLeft).toBe('24px');
  // });
});

describe('快照测试', () => {
  it('默认分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('水平分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider horizontal />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('水平中间分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider horizontal middle />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('水平插入分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider horizontal inset />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('flex布局下的垂直分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider flexItem />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
