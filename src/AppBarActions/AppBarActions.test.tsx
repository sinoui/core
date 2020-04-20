import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import AppBarActions from '@sinoui/core/AppBarActions';

/**
 * 顶部应用栏 AppBarActions组件 单元测试
 */

it('AppBarActions', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <AppBarActions>icons</AppBarActions>
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
