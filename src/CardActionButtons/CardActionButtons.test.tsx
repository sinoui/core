import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import CardActionButtons from './CardActionButtons';

describe('快照测试', () => {
  it('CardActionButtons', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardActionButtons />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
