import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import BaseInput from './BaseInput';

it('正确渲染BaseInput', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染disabled属性下的BaseInput', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput disabled />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染全宽模式下的BaseInput', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput fullWidth />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染多行输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput multiline disabled />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('值改变时，onChange被调用', () => {
  const onChange = jest.fn();
  const { getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput onChange={onChange} placeholder="请输入内容" />
    </ThemeProvider>,
  );
  const input = getByPlaceholderText('请输入内容');
  fireEvent.change(input, { target: { value: '123' } });

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('值改变时，inputProps中的onChange被调用', () => {
  const onChange = jest.fn();
  const { getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput inputProps={{ onChange }} placeholder="请输入内容" />
    </ThemeProvider>,
  );
  const input = getByPlaceholderText('请输入内容');
  fireEvent.change(input, { target: { value: '123' } });

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('获取焦点时，onFocus事件被调用', () => {
  const onFocus = jest.fn();
  const inputOnFocus = jest.fn();
  const { getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        onFocus={onFocus}
        inputProps={{ onFocus: inputOnFocus }}
        placeholder="请输入内容"
      />
    </ThemeProvider>,
  );
  const input = getByPlaceholderText('请输入内容');
  fireEvent.focus(input);
  expect(onFocus).toHaveBeenCalledTimes(1);
  expect(inputOnFocus).toHaveBeenCalled();
});

it('失去焦点时，onBlur被调用', () => {
  const onBlur = jest.fn();
  const inputOnblur = jest.fn();

  const { getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        onBlur={onBlur}
        inputProps={{ onBlur: inputOnblur }}
        placeholder="请输入内容"
      />
    </ThemeProvider>,
  );
  const input = getByPlaceholderText('请输入内容');

  fireEvent.blur(input);

  expect(onBlur).toHaveBeenCalled();
  expect(inputOnblur).toHaveBeenCalled();
});

it('渲染修饰元素', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput renderSuffix={(_state) => <div>这是修饰元素</div>} />
    </ThemeProvider>,
  );

  expect(getByText('这是修饰元素')).toBeDefined();
});

it('点击获取焦点', () => {
  const handleFocus = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput onFocus={handleFocus} />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByTestId('baseInput'));
  });

  expect(handleFocus).toBeCalled();
});
