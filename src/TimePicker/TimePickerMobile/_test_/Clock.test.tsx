import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Clock from '../Clock';

describe('快照测试', () => {
  it('Clock', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Clock isHourView hourRotateDeg={90} minuteRotateDeg={0} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
