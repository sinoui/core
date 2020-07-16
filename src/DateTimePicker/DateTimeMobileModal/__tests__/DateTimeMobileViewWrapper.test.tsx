import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import DateTimeMobileViewWrapper from '../DateTimeMobileViewWrapper';

it('渲染日期时间选择视图容器', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <DateTimeMobileViewWrapper data-testid="wrapper" />
    </ThemeProvider>,
  );

  const wrapper = getByTestId('wrapper');

  expect(wrapper).toHaveStyleRule('width', '328px');
  expect(wrapper).toHaveStyleRule('padding', '0 12px', {
    modifier: '.sinoui-week-title-bar',
  });
  expect(wrapper).toHaveStyleRule('padding', '0 12px', {
    modifier: '.sinoui-date-time-mobile-view__datesview',
  });
  expect(wrapper).toHaveStyleRule('height', '240px', {
    modifier: '.sinoui-date-time-mobile-view__datesview',
  });
});

it('镜像测试', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileViewWrapper data-testid="wrapper" />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
