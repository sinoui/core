import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import NavigationIcon from '@sinoui/core/NavigationIcon';

/**
 * 顶部应用栏 NavigationIcon组件 单元测试
 */

it('NavigationIcon', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <NavigationIcon>icons</NavigationIcon>
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
