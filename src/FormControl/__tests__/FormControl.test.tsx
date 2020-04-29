import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FormControl from '../FormControl';
import { useFormControlContext } from '..';
import type { FormControlContextData } from '../FormControlContext';

jest.mock('../useId', () => () => 'input_1');

afterAll(() => jest.unmock('../useId'));

afterEach(cleanup);

it('渲染FormControl', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl label="姓名" data-testid="formcontrol" helperText="必填">
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  const formcontrol = getByTestId('formcontrol');

  expect(formcontrol.querySelector('label')).toHaveTextContent('姓名');
  expect(formcontrol.querySelector('.sinoui-helper-text')).toHaveTextContent(
    '必填',
  );
});

it('渲染校验错误信息', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl label="姓名" data-testid="formcontrol" error="必填">
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  const formcontrol = getByTestId('formcontrol');

  expect(formcontrol.querySelector('label')).toHaveTextContent('姓名');
  expect(formcontrol.querySelector('.sinoui-helper-text')).toHaveTextContent(
    '必填',
  );
});

it('水平布局FormLabel显示冒号', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <FormControl
          label="姓名"
          data-testid="formcontrol"
          error="必填"
          layout="horizontal"
          id="input_1"
        >
          <input />
        </FormControl>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('ref指向根元素', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl data-testid="formcontrol" ref={ref}>
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  expect(ref.current).toBe(getByTestId('formcontrol'));
});

it('className', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl data-testid="formcontrol">
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  expect(getByTestId('formcontrol')).toHaveClass(
    'sinoui-form-item',
    'sinoui-form-item--vertical',
  );
});

it('自定义className', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl data-testid="formcontrol" className="custom-className">
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  expect(getByTestId('formcontrol')).toHaveClass(
    'sinoui-form-item',
    'sinoui-form-item--vertical',
    'custom-className',
  );
});

it('labelLayout为floating时的class名称', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl data-testid="formcontrol" labelLayout="floating">
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  expect(getByTestId('formcontrol')).toHaveClass(
    'sinoui-form-item',
    'sinoui-form-item--floating',
  );
});

it('水平布局', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl data-testid="formcontrol" layout="horizontal" id="input_1">
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  expect(getByTestId('formcontrol')).toHaveClass(
    'sinoui-form-item--horizontal',
  );

  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FormControl data-testid="formcontrol" layout="horizontal" id="input_1">
        <input />
      </FormControl>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('生成上下文', () => {
  let context: FormControlContextData | null | undefined;
  const Input = () => {
    context = useFormControlContext();
    return null;
  };

  render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl colon required={false} error="校验错误" filled dense={false}>
        <Input />
      </FormControl>
    </ThemeProvider>,
  );

  expect(context?.colon).toBe(true);
  expect(context?.required).toBe(false);
  expect(context?.error).toBe(true);
  expect(context?.disabled).toBeUndefined();
  expect(context?.filled).toBe(true);
  expect(context?.labelLayout).toBeUndefined();
  expect(context?.variant).toBe('standard');
  expect(context?.focused).toBe(false);
  expect(context?.layout).toBe('vertical');
  expect(context?.labelRef).not.toBeUndefined();
  expect(context?.dense).toBe(false);

  act(() => {
    const onFocus = context?.onFocus;

    if (onFocus) {
      onFocus();
    }
  });

  expect(context?.focused).toBe(true);

  act(() => {
    const onBlur = context?.onBlur;

    if (onBlur) {
      onBlur();
    }
  });

  expect(context?.focused).toBe(false);
});
