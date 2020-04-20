import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import CardActionIcons from './CardActionIcons';

describe('快照测试', () => {
  it('CardActionIcons', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardActionIcons />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
