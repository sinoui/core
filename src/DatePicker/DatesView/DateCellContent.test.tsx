import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import DateCellContent from './DateCellContent';

afterEach(cleanup);

it('显示日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCellContent data-testid="date-cell-content">10</DateCellContent>
    </ThemeProvider>,
  );

  const dateCellContent = getByTestId('date-cell-content');
  expect(dateCellContent).toHaveStyleRule('width', '36px');
  expect(dateCellContent).toHaveStyleRule('height', '36px');
  expect(dateCellContent).toHaveStyleRule('width', '28px', {
    media: 'screen and (min-width: 960px)',
  });
  expect(dateCellContent).toHaveStyleRule('height', '28px', {
    media: 'screen and (min-width: 960px)',
  });
});

it('选中状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCellContent data-testid="date-cell-content" $selected>
        10
      </DateCellContent>
    </ThemeProvider>,
  );

  const dateCellContent = getByTestId('date-cell-content');
  expect(dateCellContent).toHaveStyleRule(
    'background-color',
    defaultTheme.palette.primary.main,
  );
  expect(dateCellContent).toHaveStyleRule(
    'color',
    defaultTheme.palette.getContrastText(defaultTheme.palette.primary.main),
  );
});

it('轮廓模式', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCellContent data-testid="date-cell-content" $outlined>
        10
      </DateCellContent>
    </ThemeProvider>,
  );

  const dateCellContent = getByTestId('date-cell-content');
  expect(dateCellContent).toHaveStyleRule('border', '1px solid currentColor');
});

it('可点击', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCellContent data-testid="date-cell-content" $clickable>
        10
      </DateCellContent>
    </ThemeProvider>,
  );

  const dateCellContent = getByTestId('date-cell-content');
  expect(dateCellContent).toHaveStyleRule('cursor', 'pointer');
});

it('禁用状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCellContent data-testid="date-cell-content" disabled>
        10
      </DateCellContent>
    </ThemeProvider>,
  );

  const dateCellContent = getByTestId('date-cell-content');
  expect(dateCellContent).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.disabled.replace(/ +/g, ''),
  );
  expect(dateCellContent).toHaveStyleRule('pointer-events', 'none');
});

it('禁用且选中状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCellContent data-testid="date-cell-content" disabled $selected>
        10
      </DateCellContent>
    </ThemeProvider>,
  );

  const dateCellContent = getByTestId('date-cell-content');
  expect(dateCellContent).toHaveStyleRule(
    'color',
    defaultTheme.palette.primary.contrastText.replace(/ +/g, ''),
  );
});
