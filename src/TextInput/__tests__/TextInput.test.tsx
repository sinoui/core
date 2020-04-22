import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import InputAdornment from '@sinoui/core/InputAdornment';
import FormControl from '@sinoui/core/FormControl';
import TextInput from '../TextInput';

it('正确渲染三种模式下的输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <TextInput label="用户名" />
          <TextInput label="用户名" variant="filled" />
          <TextInput label="用户名" variant="outlined" shrink />
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
          <TextInput label="用户名" helperText="输入用户名" />
          <TextInput label="用户名" variant="filled" helperText="输入用户名" />
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
          <TextInput label="用户名" required error errorText="必填" />
          <TextInput
            label="用户名"
            variant="filled"
            required
            error
            errorText="必填"
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
          <TextInput label="用户名" helperText="输入用户名" disabled />
          <TextInput
            label="用户名"
            variant="filled"
            helperText="输入用户名"
            disabled
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
          <TextInput
            label="金额"
            startAdornment={
              <InputAdornment position="start">￥</InputAdornment>
            }
          />
          <TextInput
            variant="filled"
            label="金额"
            startAdornment={
              <InputAdornment position="start">￥</InputAdornment>
            }
          />
          <TextInput
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
          <TextInput
            label="重量"
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          />
          <TextInput
            variant="filled"
            label="重量"
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          />
          <TextInput
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
        <TextInput
          label="用户名"
          placeholder="填充输入框"
          variant="filled"
          onFocus={onFocus}
          inputProps={{ onFocus: onFocusInInputProps }}
        />
        <TextInput
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
      <TextInput
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

it('框模式的输入框输入值时，outlineInput的notched状态为true', () => {
  const { container, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput variant="outlined" value="" />
    </ThemeProvider>,
  );

  const notchedOutline = container.querySelector(
    '.sinoui-notched-outline',
  ) as HTMLElement;

  expect(notchedOutline).not.toHaveClass('sinoui-notched-outline--notched');

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <TextInput value="123" variant="outlined" />
    </ThemeProvider>,
  );
  expect(notchedOutline).toHaveClass('sinoui-notched-outline--notched');
});

it('style属性', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput
        style={{ margin: 8 }}
        variant="outlined"
        wrapperProps={{
          'data-testid': 'root',
        }}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('root')).toHaveStyle('margin: 8px');
});

it('无标签', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput
        variant="outlined"
        wrapperProps={{
          'data-testid': 'input',
        }}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('input')).toHaveClass('sinoui-text-input--no-label');
});

it('在表单控件中使用', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl label="姓名">
        <TextInput
          wrapperProps={{
            'data-testid': 'input',
          }}
        />
      </FormControl>
    </ThemeProvider>,
  );

  expect(getByTestId('input')).toHaveClass('sinoui-text-input--no-label');
});

it('在表单控件中使用浮动标签', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl label="姓名" labelLayout="floating">
        <TextInput
          wrapperProps={{
            'data-testid': 'input',
          }}
        />
      </FormControl>
    </ThemeProvider>,
  );

  expect(getByTestId('input')).not.toHaveClass('sinoui-text-input--no-label');
});

it('输入框作为表单控件使用', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput field wrapperProps={{ 'data-testid': 'input' }} />
    </ThemeProvider>,
  );

  const input = getByTestId('input');

  expect(input).toHaveClass('sinoui-form-control');
  expect(input.querySelector('.sinoui-helper-line')).toBeTruthy();
});
it('错误状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput
        variant="outlined"
        error
        wrapperProps={{
          'data-testid': 'input',
        }}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('input')).toHaveClass('sinoui-text-input--error');
});

it('只有errorText属性时，不会显示错误状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput
        variant="outlined"
        errorText="必填"
        wrapperProps={{
          'data-testid': 'input',
        }}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('input')).not.toHaveClass('sinoui-text-input--error');
});

it('值是空数组', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput wrapperProps={{ 'data-testid': 'input' }} value={[] as any} />
    </ThemeProvider>,
  );

  expect(getByTestId('input')).not.toHaveClass('sinoui-text-input--shrink');
});

it('ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TextInput wrapperProps={{ 'data-testid': 'input' }} ref={ref} />
    </ThemeProvider>,
  );

  expect(getByTestId('input')).toBe(ref.current);
});
