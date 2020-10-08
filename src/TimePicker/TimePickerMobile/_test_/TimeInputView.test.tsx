import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TimeInputView from '../TimeInputView';

describe('快照测试', () => {
  const onHourChange = jest.fn();
  const onMinuteChange = jest.fn();
  it('TimeInputView', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <TimeInputView
            selectedMinute="12"
            selectedHour="12"
            onHourChange={onHourChange}
            onMinuteChange={onMinuteChange}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
