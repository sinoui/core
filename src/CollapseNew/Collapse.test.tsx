import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import Collapse from './Collapse';

afterEach(cleanup);

jest.useFakeTimers();

it('默认展现', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in>
        <div style={{ width: 200, height: 400 }}>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).toHaveStyleRule('transform');
});

it('默认隐藏', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Collapse data-testid="collapse" in={false}>
        <div>测试</div>
      </Collapse>
    </ThemeProvider>,
  );

  expect(getByTestId('collapse')).not.toHaveStyleRule(
    'transform',
    'scale(1, 1)',
  );
});
