import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import MobileDateRangeViewContent from '../MobileDateRangeViewContent';

it('快照测试-->渲染', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeViewContent>123</MobileDateRangeViewContent>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
