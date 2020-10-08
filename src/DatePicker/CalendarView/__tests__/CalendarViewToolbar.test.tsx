import { render, cleanup } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import CalendarViewToolbar from '../CalendarViewToolbar';

afterEach(cleanup);

it('展示日历视图的工具栏', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewToolbar
        title="选择日期"
        value={new Date(2020, 2, 3)}
        data-testid="toolbar"
      />
    </ThemeProvider>,
  );

  expect(getByTestId('toolbar')).toHaveTextContent('选择日期');
  expect(getByTestId('toolbar')).toHaveTextContent('2020年3月3日');
});
