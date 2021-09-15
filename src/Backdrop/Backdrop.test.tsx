/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Backdrop from './Backdrop';

afterEach(cleanup);

it('展现遮罩层', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Backdrop open data-testid="backdrop" />
    </ThemeProvider>,
  );
  expect(getByTestId('backdrop')).not.toHaveStyle('visibility: hidden');
  expect(getByTestId('backdrop')).toHaveStyle('opacity: 1');
});

it('隐藏遮罩层', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Backdrop open={false} data-testid="backdrop" />
    </ThemeProvider>,
  );
  expect(getByTestId('backdrop')).toHaveStyle('visibility: hidden');
  expect(getByTestId('backdrop')).toHaveStyle('opacity: 0');
});

it('透明展现遮罩层', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Backdrop open visible={false} data-testid="backdrop" />
    </ThemeProvider>,
  );

  expect(getByTestId('backdrop')).toHaveStyleRule(
    'background-color',
    'rgba(0,0,0,0)',
  );
});
