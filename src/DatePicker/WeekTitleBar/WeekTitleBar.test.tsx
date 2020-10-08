import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import WeekTitleBar from './WeekTitleBar';

afterEach(cleanup);

it('显示周标题', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <WeekTitleBar data-testid="week-title-bar" />
    </ThemeProvider>,
  );

  expect(getByTestId('week-title-bar')).toHaveTextContent('一二三四五六日');
});

it('从星期日开始显示周标题', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <WeekTitleBar data-testid="week-title-bar" startOfWeek={0} />
    </ThemeProvider>,
  );

  expect(getByTestId('week-title-bar')).toHaveTextContent('日一二三四五六');
});
