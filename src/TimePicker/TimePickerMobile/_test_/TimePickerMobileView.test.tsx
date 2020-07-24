import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
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

it('切换为键盘输入视图', () => {
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

  act(() => {
    fireEvent.click(container.querySelector('[data-view-icon]') as Element);
  });

  expect(
    container.querySelector('.sinoui-time-picker-mobile-view__keyboard'),
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
