import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import MobileTimePickerHeader from '../MobileTimePickerHeader';

describe('快照测试', () => {
  it('Clock', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <MobileTimePickerHeader isHourView isAm hour={3} minute={20} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
