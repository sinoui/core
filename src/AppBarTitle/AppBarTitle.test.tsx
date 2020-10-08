import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import AppBarTitle from '@sinoui/core/AppBarTitle';

/**
 * 应用栏 标题组件 单元测试
 */

it('AppBarTitle', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <AppBarTitle>标题</AppBarTitle>
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
