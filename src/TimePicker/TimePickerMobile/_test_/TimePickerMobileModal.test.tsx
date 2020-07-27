import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import TimePickerMobileModal from '../TimePickerMobileModal';

describe('快照测试', () => {
  const onRequestClose = jest.fn();
  it('Clock', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <TimePickerMobileModal
            value="19:21"
            open
            onRequestClose={onRequestClose}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
