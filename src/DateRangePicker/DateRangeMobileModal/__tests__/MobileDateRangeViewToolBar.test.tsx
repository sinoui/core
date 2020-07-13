import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import MobileDateRangeViewToolBar from '../MobileDateRangeViewToolBar';

afterEach(cleanup);

describe('快照测试', () => {
  it('渲染', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <MobileDateRangeViewToolBar />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('验收测试', () => {
  it('显示', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeViewToolBar />
      </ThemeProvider>,
    );

    expect(getByText('保存')).toBeInTheDocument();
    expect(getByText('清除')).toBeInTheDocument();
  });

  it('点击清除按钮，清空选中时间', () => {
    const onClear = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeViewToolBar
          startDate={new Date(2020, 6, 20)}
          endDate={new Date(2020, 7, 10)}
          onClear={onClear}
        />
      </ThemeProvider>,
    );

    expect(getByText('7月20日')).toBeInTheDocument();

    fireEvent.click(getByText('清除'));
    expect(onClear).toBeCalled();
  });

  it('点击保存按钮，onOk被调用', () => {
    const onOk = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeViewToolBar
          startDate={new Date(2020, 6, 20)}
          endDate={new Date(2020, 7, 10)}
          onOk={onOk}
        />
      </ThemeProvider>,
    );
    fireEvent.click(getByText('保存'));
    expect(onOk).toBeCalled();
  });

  it('点击开始时间,onFocusedChange被调用', () => {
    const onFocusedChange = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeViewToolBar
          onFocusedChange={onFocusedChange}
          focused="end"
        />
      </ThemeProvider>,
    );
    fireEvent.click(getByText('开始时间'));
    expect(onFocusedChange).toBeCalledWith('start');
    expect(getByText('结束时间')).toHaveStyle('opacity:1');
    expect(getByText('开始时间')).toHaveStyle('opacity:0.7');
  });

  it('onClose属性', () => {
    const onClose = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeViewToolBar onClose={onClose} focused="end" />
      </ThemeProvider>,
    );

    fireEvent.click(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container.querySelector(
        '.sinoui-date-range-view-toolbar .sinoui-icon-button',
      )!,
    );

    expect(onClose).toBeCalled();
  });
});
