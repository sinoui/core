import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import CardActions from './CardActions';

describe('快照测试', () => {
  it('CardActions', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardActions />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
