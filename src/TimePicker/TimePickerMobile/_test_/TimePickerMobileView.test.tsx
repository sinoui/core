import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import TimePickerMobileView from '../TimePickerMobileView';

afterEach(cleanup);

it('默认为时钟视图', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileView
        value="11:28"
        onChange={onChange}
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-time-picker-mobile-view__clock'),
  ).toBeTruthy();
});

describe('TimePickerMobileView', () => {
  const onChange = jest.fn();
  const onRequestClose = jest.fn();
  it('小时视图', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <TimePickerMobileView
            value="11:28"
            onChange={onChange}
            onRequestClose={onRequestClose}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
