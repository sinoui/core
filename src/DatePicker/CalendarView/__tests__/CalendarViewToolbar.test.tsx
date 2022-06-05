/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { defaultTheme } from '@sinoui/theme';
import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import CalendarViewToolbar from '../CalendarViewToolbar';
import DateText from '../DateText';

afterEach(cleanup);

it('展示日历视图的工具栏', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewToolbar title="选择日期" data-testid="toolbar">
        <DateText date={new Date(2020, 2, 3)} />
      </CalendarViewToolbar>
    </ThemeProvider>,
  );

  expect(getByTestId('toolbar')).toHaveTextContent('选择日期');
  expect(getByTestId('toolbar')).toHaveTextContent('2020年3月3日');
});
