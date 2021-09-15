/**
 * @jest-environment jsdom
 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import CalendarViewHeaderWrapper from '../CalendarViewHeaderWrapper';

it('渲染日历视图头部容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeaderWrapper data-testid="wrapper" />
    </ThemeProvider>,
  );

  const wrapper = getByTestId('wrapper');

  expect(wrapper).toHaveStyleRule('padding', '16px 24px');
  expect(wrapper).toHaveStyleRule('padding', '16px 8px 12px 24px', {
    media: `screen and (min-width: ${defaultTheme.breakpoints.md}px)`,
  });
});
