import { render } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import YearSelectViewWrapper from '../YearSelectViewWrapper';

it('渲染年份选择视图容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <YearSelectViewWrapper
        $columns={3}
        data-testid="year-select-view-wrapper"
      />
    </ThemeProvider>,
  );

  const yearSelectViewWrapper = getByTestId('year-select-view-wrapper');

  expect(yearSelectViewWrapper).toHaveStyleRule(
    '-ms-grid-columns',
    '1fr 1fr 1fr',
  );
  expect(yearSelectViewWrapper).toHaveStyleRule(
    'grid-template-columns',
    'repeat(3,1fr)',
  );
});
