import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import '@testing-library/jest-dom';
import CalendarViewAction from '../CalendarViewAction';

afterEach(cleanup);

it('渲染日历底部操作区域视图', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewAction />
    </ThemeProvider>,
  );

  expect(getByText('确定')).toBeInTheDocument();
  expect(getByText('取消')).toBeInTheDocument();
});

it('点击确定，调用onOk方法', () => {
  const onOk = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewAction onOk={onOk} />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByText('确定'));
  });

  expect(onOk).toBeCalled();
});

it('点击确定，调用onCancel方法', () => {
  const onCancel = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewAction onCancel={onCancel} />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByText('取消'));
  });

  expect(onCancel).toBeCalled();
});
