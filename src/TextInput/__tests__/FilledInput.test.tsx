import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import FilledInput from '../FilledInput';

it('正确渲染填充模式的input', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FilledInput />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下的填充模式的Input', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FilledInput disabled />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染错误状态下填充模式的Input', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FilledInput error />
    </ThemeProvider>,
  ).toJSON;

  expect(tree).toMatchSnapshot();
});

it('渲染密集状态下填充模式的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FilledInput dense />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('获取焦点和失去焦点时，样式类的切换', () => {
  const onFocus = jest.fn();
  const onFocusInputProp = jest.fn();
  const onBlur = jest.fn();
  const onBlurInputProp = jest.fn();
  const { getByTestId, getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <FilledInput
        onFocus={onFocus}
        inputProps={{ onFocus: onFocusInputProp, onBlur: onBlurInputProp }}
        onBlur={onBlur}
        placeholder="占位符"
      />
    </ThemeProvider>,
  );
  const input = getByPlaceholderText('占位符');
  fireEvent.focus(input);

  expect(onFocus).toHaveBeenCalled();
  expect(onFocusInputProp).toHaveBeenCalled();
  expect(getByTestId('baseInput')).toHaveClass(
    'sinoui-base-input__layout sinoui-filled-input--focused',
  );

  fireEvent.blur(input);

  expect(onBlurInputProp).toHaveBeenCalled();
  expect(onBlur).toHaveBeenCalled();
  expect(getByTestId('baseInput')).toHaveClass('sinoui-base-input__layout ');
});
