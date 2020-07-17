import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import DateRangeHeaderWrapper from '../DateRangeHeaderWrapper';

it('渲染日期区间选择头部容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeHeaderWrapper data-testid="wrapper" />
    </ThemeProvider>,
  );

  const wrapper = getByTestId('wrapper');

  expect(wrapper).toHaveStyleRule('padding', '16px 16px 8px');
});
