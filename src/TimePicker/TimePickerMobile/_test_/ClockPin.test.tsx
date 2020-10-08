import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import ClockPin from '../ClockPin';

describe('快照测试', () => {
  it('ClockPin', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClockPin />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
