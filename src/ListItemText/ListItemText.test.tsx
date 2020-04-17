import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import ListItemText from '@sinoui/core/ListItemText';

describe('快照测试', () => {
  it('默认', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ListItemText secondary="副标题">标题</ListItemText>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
