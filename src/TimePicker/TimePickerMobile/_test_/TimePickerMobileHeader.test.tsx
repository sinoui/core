import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import TimePickerMobileHeader from '../TimePickerMobileHeader';

describe('快照测试', () => {
  const onChangeAm = jest.fn();
  const onChangeHourOrMinuteView = jest.fn();
  it('时钟视图下弹出头部view', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <TimePickerMobileHeader
            isClockView
            isHourView
            isAm
            hour={3}
            minute={20}
            onChangeAm={onChangeAm}
            onChangeHourOrMinuteView={onChangeHourOrMinuteView}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('键盘输入视图下弹出头部view', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <TimePickerMobileHeader
            isClockView={false}
            isHourView
            isAm
            hour={3}
            minute={20}
            onChangeAm={onChangeAm}
            onChangeHourOrMinuteView={onChangeHourOrMinuteView}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
