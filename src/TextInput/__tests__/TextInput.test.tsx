import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import InputAdornment from '@sinoui/core/InputAdornment';
import TextInputField from '../TextInput';

it('正确渲染三种模式下的输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <TextInputField label="用户名" />
          <TextInputField label="用户名" variant="filled" />
          <TextInputField label="用户名" variant="outlined" labelWidth={62} />
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染有辅助性文字的输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <TextInputField label="用户名" helperText="输入用户名" />
          <TextInputField
            label="用户名"
            variant="filled"
            helperText="输入用户名"
          />
          <TextInputField
            label="用户名"
            variant="outlined"
            labelWidth={62}
            helperText="输入用户名"
          />
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染有错误提示的输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <TextInputField label="用户名" required error="必填" />
          <TextInputField
            label="用户名"
            variant="filled"
            required
            error="必填"
          />
          <TextInputField
            label="用户名"
            variant="outlined"
            labelWidth={62}
            required
            error="必填"
          />
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下三种形态输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <TextInputField label="用户名" helperText="输入用户名" disabled />
          <TextInputField
            label="用户名"
            variant="filled"
            helperText="输入用户名"
            disabled
          />
          <TextInputField
            label="用户名"
            variant="outlined"
            labelWidth={62}
            dense
            disabled
            helperText="输入用户名"
          />
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染带前缀元素的装饰器', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <TextInputField
            label="金额"
            startAdornment={
              <InputAdornment position="start">￥</InputAdornment>
            }
          />
          <TextInputField
            variant="filled"
            label="金额"
            startAdornment={
              <InputAdornment position="start">￥</InputAdornment>
            }
          />
          <TextInputField
            variant="outlined"
            label="金额"
            startAdornment={
              <InputAdornment position="start">￥</InputAdornment>
            }
          />
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染带后缀元素的输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <TextInputField
            label="重量"
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          />
          <TextInputField
            variant="filled"
            label="重量"
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          />
          <TextInputField
            variant="outlined"
            label="重量"
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          />
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('获取焦点时，onFocus被调用', () => {
  const onFocus = jest.fn();
  const onFocusInInputProps = jest.fn();

  const { getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <div>
        <TextInputField
          label="用户名"
          placeholder="填充输入框"
          variant="filled"
          onFocus={onFocus}
          inputProps={{ onFocus: onFocusInInputProps }}
        />
        <TextInputField
          label="用户名"
          placeholder="边框输入框"
          variant="outlined"
          onFocus={onFocus}
          inputProps={{ onFocus: onFocusInInputProps }}
        />
      </div>
    </ThemeProvider>,
  );

  const filledInput = getByPlaceholderText('填充输入框');
  const outlinedInput = getByPlaceholderText('边框输入框');

  fireEvent.focus(filledInput);
  fireEvent.focus(outlinedInput);

  expect(onFocus).toHaveBeenCalled();
  expect(onFocusInInputProps).toHaveBeenCalled();
});

it('失去焦点时，onBlur被调用', () => {
  const onBlur = jest.fn();
  const onBlurInInputProps = jest.fn();

  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInputField
        label="用户名"
        onBlur={onBlur}
        inputProps={{ onBlur: onBlurInInputProps }}
      />
    </ThemeProvider>,
  );

  const outlinedInput = container.querySelector('input') as HTMLInputElement;

  fireEvent.blur(outlinedInput);

  expect(onBlurInInputProps).toHaveBeenCalled();
  expect(onBlur).toHaveBeenCalled();
});

it('框模式的输入框输入值时，outlineInput的notched状态为false', () => {
  const { container, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInputField labelWidth={60} variant="outlined" />
    </ThemeProvider>,
  );

  const legend = container.querySelector('legend') as HTMLElement;

  expect(legend).toHaveStyle('width: auto');

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <TextInputField labelWidth={60} value="123" variant="outlined" />
    </ThemeProvider>,
  );
  expect(legend).toHaveStyle('width: 53px');
});
