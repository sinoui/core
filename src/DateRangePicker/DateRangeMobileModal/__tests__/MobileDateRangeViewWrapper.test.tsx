import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import MobileDateRangeViewWrapper from '../MobileDateRangeViewWrapper';

it('快照测试--> 渲染', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <MobileDateRangeViewWrapper>123</MobileDateRangeViewWrapper>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
