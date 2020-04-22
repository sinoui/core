import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Divider from '@sinoui/core/Divider';

/**
 * 分割线组件 单元测试
 */
describe('分割线组件 单元测试', () => {
  afterEach(cleanup);
  it('默认分隔线', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('sinoui-divider');
  });

  it('垂直分隔线', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" vertical />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('sinoui-divider--vertical');
  });

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" as="div" />
      </ThemeProvider>,
    );
    expect(container.firstChild && container.firstChild.nodeName).toBe('DIV');
  });

  it('设置水平间距24px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" marginHorizontal={24} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle('margin-left:24px');
    expect(container.firstChild).toHaveStyle('margin-right:24px');
  });

  it('设置垂直间距24px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" vertical marginVertical={24} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle('margin-top:24px');
    expect(container.firstChild).toHaveStyle('margin-bottom:24px');
  });

  it('水平中间分隔线设置左边距0px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" middle marginLeft={0} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle('margin-left:0px');
  });

  it('水平中间分隔线设置右边距0px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" middle marginRight={0} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle('margin-right:0px');
  });

  it('垂直分隔线设置上边距16px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" vertical marginTop={16} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle('margin-top:16px');
  });

  it('垂直分隔线设置下边距16px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" vertical marginBottom={16} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle('margin-bottom:16px');
  });

  it('自定义className', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" className="custom" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('自定义style', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Divider data-testid="divider" style={{ marginLeft: '24px' }} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveAttribute('style');
    expect(container.firstChild).toHaveStyle('margin-left:24px');
  });
});

describe('快照测试', () => {
  it('默认水平分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('水平中间分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider middle />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('水平插入分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider inset />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('垂直分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider vertical />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('flex布局下的垂直分割线', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Divider vertical flexItem />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
