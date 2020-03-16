import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import List from '@sinoui/core/List';

/**
 *  单元测试
 */
describe('List', () => {
  afterEach(cleanup);
  it('自定义class名称', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <List className="test" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('紧凑模式下样式类', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <List data-testid="list" dense />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('sinoui-list--dense');
  });

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <List as="div" />
      </ThemeProvider>,
    );
    expect(container.firstChild && container.firstChild.nodeName).toBe('DIV');
  });
});

describe('快照测试', () => {
  it('默认', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <List />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
