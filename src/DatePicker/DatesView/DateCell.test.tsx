/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import DateCell from './DateCell';

afterEach(cleanup);

it('展示空日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCell data-testid="date-cell" row={1} column={2} />
    </ThemeProvider>,
  );

  const dateCell = getByTestId('date-cell');
  expect(dateCell).toBeEmptyDOMElement();
  expect(dateCell).toHaveClass('sinoui-date-cell--empty');
  expect(dateCell).toHaveAttribute('data-row', '1');
  expect(dateCell).toHaveAttribute('data-column', '2');
});

it('展示日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCell data-testid="date-cell" date={10} row={1} column={2} />
    </ThemeProvider>,
  );

  const dateCell = getByTestId('date-cell');

  expect(dateCell).toHaveTextContent('10');
  expect(dateCell).toHaveClass('sinoui-date-cell');
});

it('展示选中的日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCell data-testid="date-cell" date={10} selected row={1} column={2} />
    </ThemeProvider>,
  );

  const dateCell = getByTestId('date-cell');

  expect(dateCell).toHaveClass('sinoui-date-cell--selected');
});

it('展示轮廓日期', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCell data-testid="date-cell" date={10} outlined row={1} column={2} />
    </ThemeProvider>,
  );

  const dateCell = getByTestId('date-cell');

  expect(dateCell).toHaveClass('sinoui-date-cell--outlined');
});

it('禁用状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateCell data-testid="date-cell" date={10} disabled row={1} column={2} />
    </ThemeProvider>,
  );

  const dateCell = getByTestId('date-cell');

  expect(dateCell).toHaveClass('sinoui-date-cell--disabled');
  expect(dateCell.querySelector('.sinoui-date-cell-content')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
});
