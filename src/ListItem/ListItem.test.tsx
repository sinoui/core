import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';

/**
 *  单元测试
 */
describe('List', () => {
  afterEach(cleanup);
  it('自定义class名称', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <List>
          <ListItem data-testid="listItem" className="test">
            item
          </ListItem>
        </List>
      </ThemeProvider>,
    );
    expect(getByTestId('listItem')).toHaveClass('test');
  });

  it('指定不同的根元素', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <List as="div">
          <ListItem as="div">item</ListItem>
        </List>
      </ThemeProvider>,
    );
    expect(container.firstChild && container.firstChild.nodeName).toBe('DIV');
  });

  it('不同属性值下的样式类', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <List>
          <ListItem data-testid="listItem" insert dense disabledRipple>
            item
          </ListItem>
        </List>
      </ThemeProvider>,
    );
    expect(getByTestId('listItem')).toHaveClass('sinoui-list-item--insert');
    expect(getByTestId('listItem')).toHaveClass('sinoui-list-item--dense');
    expect(getByTestId('listItem')).toHaveClass(
      'sinoui-list-item--disabled-ripple',
    );
    // 内嵌列表项有32px的左边距
    expect(getByTestId('listItem')).toHaveStyle('padding-left: 32px');
  });

  it('ListItem设置72px的左内边距', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <List>
          <ListItem data-testid="listItem" paddingLeft={72}>
            item
          </ListItem>
        </List>
      </ThemeProvider>,
    );
    expect(getByTestId('listItem')).toHaveStyle('padding-left: 72px');
  });

  it('单击事件', () => {
    const testClick = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <List>
          <ListItem data-testid="listItem" onClick={testClick}>
            item
          </ListItem>
        </List>
      </ThemeProvider>,
    );
    act(() => {
      fireEvent.click(getByTestId('listItem'));
    });
    expect(testClick).toHaveBeenCalled();
  });

  it('双击事件', () => {
    const testDoubleClick = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <List>
          <ListItem data-testid="listItem" onDoubleClick={testDoubleClick}>
            item
          </ListItem>
        </List>
      </ThemeProvider>,
    );
    act(() => {
      fireEvent.doubleClick(getByTestId('listItem'));
    });
    expect(testDoubleClick).toHaveBeenCalled();
  });
});

describe('快照测试', () => {
  it('默认', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>item</ListItem>
          </List>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('设置属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem insert disabledRipple disabled>
              item
            </ListItem>
          </List>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
