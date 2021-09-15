/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { defaultTheme } from '@sinoui/theme';
import { ThemeProvider } from 'styled-components';
import YearItem from '../YearItem';

afterEach(cleanup);

it('渲染年份选项', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearItem row={10} column={5} data-testid="yearitem" />
    </ThemeProvider>,
  );

  const yearItem = getByTestId('yearitem');
  expect(yearItem).toHaveStyleRule('width', '72px');
  expect(yearItem).toHaveStyleRule('height', '36px');
  expect(yearItem).toHaveStyleRule('margin', '8px');
});

it('渲染pc端年份选项', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearItem row={10} column={5} data-testid="yearitem" $isPc />
    </ThemeProvider>,
  );

  const yearItem = getByTestId('yearitem');

  expect(yearItem).toHaveStyleRule('width', '52px');
  expect(yearItem).toHaveStyleRule('height', '28px');
  expect(yearItem).toHaveStyleRule('margin', '2px');
});

it('禁用', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearItem row={10} column={5} data-testid="yearitem" disabled />
    </ThemeProvider>,
  );

  const yearItem = getByTestId('yearitem');

  expect(yearItem).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.disabled.replace(/ +/g, ''),
  );
});

it('选中', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearItem row={10} column={5} data-testid="yearitem" $selected />
    </ThemeProvider>,
  );

  const yearItem = getByTestId('yearitem');

  expect(yearItem).toHaveStyleRule(
    'color',
    defaultTheme.palette.primary.contrastText.replace(/ /g, ''),
  );
  expect(yearItem).toHaveStyleRule(
    'background-color',
    defaultTheme.palette.primary.main,
  );
  expect(yearItem).toHaveStyleRule(
    'background-color',
    defaultTheme.palette.primary.main,
    {
      modifier: ':hover',
    },
  );
});
