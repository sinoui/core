import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
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

  it('测试通过键盘上键改变聚焦元素', () => {
    const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const testClick = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <List>
          {listData.map((item) => (
            <>
              <ListItem
                disabled={item % 3 === 0}
                key={item}
                onClick={testClick}
              >
                <ListItemText>item{item}</ListItemText>
              </ListItem>
            </>
          ))}
        </List>
      </ThemeProvider>,
    );
    const listItemEle = container.querySelectorAll('.sinoui-list-item');
    listItemEle[1].focus();
    expect(listItemEle[1]).toHaveFocus();

    act(() => {
      fireEvent.keyDown(listItemEle[1], { keyCode: 40 });
    });
    expect(listItemEle[2]).not.toHaveFocus();
    expect(listItemEle[3]).toHaveFocus();
  });

  it('第一项获取焦点，点击向上切换，焦点仍在第一项', () => {
    const listData = [1, 2, 3, 4];
    const testClick = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <List>
          {listData.map((item) => (
            <>
              <ListItem
                disabled={item % 3 === 0}
                key={item}
                onClick={testClick}
              >
                <ListItemText>item{item}</ListItemText>
              </ListItem>
            </>
          ))}
        </List>
      </ThemeProvider>,
    );
    const listItemEle = container.querySelectorAll('.sinoui-list-item');
    listItemEle[0].focus();
    expect(listItemEle[0]).toHaveFocus();

    act(() => {
      fireEvent.keyDown(listItemEle[0], { keyCode: 38 });
    });
    expect(listItemEle[1]).not.toHaveFocus();
    expect(listItemEle[0]).toHaveFocus();
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
