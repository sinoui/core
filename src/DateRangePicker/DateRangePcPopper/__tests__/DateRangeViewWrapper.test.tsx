import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import DateRangeViewWrapper from '../DateRangeViewWrapper';

it('渲染日期区间选择日期的容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeViewWrapper data-testid="wrapper" />
    </ThemeProvider>,
  );

  const wrapper = getByTestId('wrapper');

  expect(wrapper).toHaveStyleRule('width', '512px');
});
