import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import InputAdornment from '@sinoui/core/InputAdornment';
import FormControlContext from '@sinoui/core/FormControl/FormControlContext';
import BaseInput from '../BaseInput';

afterEach(cleanup);

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
        <BaseInput multiline />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染支持清除功能的输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput allowClear />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染带后缀的支持清除功能的输入框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput
          allowClear
          value="123"
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          data-testid="input"
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();

  expect(tree).toHaveStyleRule('opacity', '0', {
    modifier: '> .sinoui-base-input__clear',
  });
  expect(tree).toHaveStyleRule('pointer-events', 'none', {
    modifier: '> .sinoui-base-input__clear',
  });
  expect(tree).toHaveStyleRule('opacity', '1', {
    modifier: '> .sinoui-input-adornment--end',
  });

  expect(tree).toHaveStyleRule('opacity', '1', {
    modifier: '&:hover > .sinoui-base-input__clear',
  });
  expect(tree).toHaveStyleRule('pointer-events', 'auto', {
    modifier: '&:hover > .sinoui-base-input__clear',
  });
  expect(tree).toHaveStyleRule('opacity', '0', {
    modifier: '&:hover > .sinoui-input-adornment--end',
  });
});

it('值改变时，onChange被调用', () => {
  let inputValue: string | undefined;
  const onChange = jest.fn().mockImplementation((event: any) => {
    inputValue = event.target.value;
  });
  const { getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput onChange={onChange} placeholder="请输入内容" />
    </ThemeProvider>,
  );
  const input = getByPlaceholderText('请输入内容');

  act(() => {
    fireEvent.change(input, { target: { value: '123' } });
  });

  expect(onChange).toBeCalled();
  expect(inputValue).toBe('123');
});

it('值改变时，inputProps中的onChange被调用', () => {
  let inputValue: string | undefined;
  const onChange = jest.fn().mockImplementation((event: any) => {
    inputValue = event.target.value;
  });

  const { getByPlaceholderText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput inputProps={{ onChange }} placeholder="请输入内容" />
    </ThemeProvider>,
  );
  const input = getByPlaceholderText('请输入内容');

  act(() => {
    fireEvent.change(input, { target: { value: '123' } });
  });

  expect(onChange).toBeCalled();
  expect(inputValue).toBe('123');
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
  expect(onFocus).toBeCalled();
  expect(inputOnFocus).toBeCalled();
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

  expect(onBlur).toBeCalled();
  expect(inputOnblur).toBeCalled();
});

it('指定子元素', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput>
        <div>这是修饰元素</div>
      </BaseInput>
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

it('通过inputRef获取单行输入框元素', () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const inputRef2 = React.createRef<HTMLInputElement>();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        inputRef={inputRef}
        inputProps={{
          ref: inputRef2,
        }}
      />
    </ThemeProvider>,
  );

  const input = container.querySelector('input');

  expect(input).toBe(inputRef.current);
  expect(input).toBe(inputRef2.current);
});

it('必填', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput required />
    </ThemeProvider>,
  );

  const input = container.querySelector('input');

  expect(input).toHaveAttribute('aria-required', 'true');
});

it('通过inputComponent指定新的输入框元素', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        inputComponent="span"
        inputProps={{
          'data-testid': 'input',
        }}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('input').tagName).toBe('SPAN');
});

it('需要向下传递给输入框元素的属性', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        autoComplete="address"
        disabled
        placeholder="地址"
        type="number"
      />
    </ThemeProvider>,
  );
  const input = getByTestId('baseInput').querySelector('input');

  expect(input?.type).toBe('number');
  expect(input).toHaveAttribute('autoComplete', 'address');
  expect(input).toHaveAttribute('disabled');
  expect(input).toHaveAttribute('placeholder', '地址');
});

it('前缀装饰器', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('后缀装饰器', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <BaseInput
          endAdornment={<InputAdornment position="end">千克</InputAdornment>}
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('设置id和name', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput id="userName" name="firstName" />
    </ThemeProvider>,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('id', 'userName');
  expect(input).toHaveAttribute('name', 'firstName');
});

it('设置minRows和maxRows', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <BaseInput multiline minRows={2} maxRows={4} />
          <BaseInput minRows={2} maxRows={4} />
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('设置校验错误信息', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        error
        errorText="错误信息"
        inputProps={{
          'data-testid': 'input',
        }}
      />
    </ThemeProvider>,
  );

  const input = getByTestId('input') as HTMLInputElement;
  expect(input.validationMessage).toBe('错误信息');

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        inputProps={{
          'data-testid': 'input',
        }}
      />
    </ThemeProvider>,
  );

  expect(input.validationMessage).toBe('');
});

it('多行输入框', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput multiline data-testid="input" />
    </ThemeProvider>,
  );

  expect(getByTestId('input')).toHaveClass('sinoui-base-input--multiline');
});

it('监听清除图标的点击事件', () => {
  const onClear = jest.fn();
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <BaseInput
        allowClear
        data-testid="input"
        onClear={onClear}
        onChange={onChange}
        value="123"
      />
    </ThemeProvider>,
  );

  const clearIcon = getByTestId('input').querySelector(
    '.sinoui-base-input__clear svg',
  );

  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(clearIcon!);
  });

  expect(onClear).toBeCalled();
  expect(onChange).not.toBeCalled();
});

it('在FormControl上下文中使用', () => {
  const onFocus = jest.fn();
  const onBlur = jest.fn();

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControlContext.Provider value={{ onFocus, onBlur }}>
        <BaseInput inputProps={{ 'data-testid': 'input' }} />
      </FormControlContext.Provider>
    </ThemeProvider>,
  );

  const input = getByTestId('input');

  fireEvent.focus(input);
  expect(onFocus).toBeCalled();

  fireEvent.blur(input);
  expect(onBlur).toBeCalled();
});

it('从表单控件上下文中获取id', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControlContext.Provider value={{ id: 'input_1' } as any}>
        <BaseInput inputProps={{ 'data-testid': 'input' }} />
      </FormControlContext.Provider>
    </ThemeProvider>,
  );

  expect(getByTestId('input')).toHaveAttribute('id', 'input_1');
});
