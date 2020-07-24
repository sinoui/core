import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import DateTimeViewWrapper from '../DateTimeViewWrapper';

it('渲染pc端日期时间选择容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeViewWrapper data-testid="wrapper" $isPc />
    </ThemeProvider>,
  );

  const wrapper = getByTestId('wrapper');

  expect(wrapper).toHaveStyleRule('display', 'inline-flex');
});
