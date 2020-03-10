import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import CardContent from './CardContent';

describe('快照测试', () => {
  it('CardContent', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardContent />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
