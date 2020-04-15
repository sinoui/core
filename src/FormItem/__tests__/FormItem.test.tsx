import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FormItem from '../FormItem';
import { useFormItemContext } from '..';
import type { FormItemContextData } from '../FormItemContext';

jest.mock('../useId', () => () => 'input_1');

afterAll(() => jest.unmock('../useId'));

afterEach(cleanup);

it('渲染FormItem', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormItem label="姓名" data-testid="formitem" helperText="必填">
        <input />
      </FormItem>
    </ThemeProvider>,
  );

  const formitem = getByTestId('formitem');

  expect(formitem.querySelector('label')).toHaveTextContent('姓名');
  expect(formitem.querySelector('.sinoui-helper-text')).toHaveTextContent(
    '必填',
  );
});

it('渲染校验错误信息', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormItem label="姓名" data-testid="formitem" error="必填">
        <input />
      </FormItem>
    </ThemeProvider>,
  );

  const formitem = getByTestId('formitem');

  expect(formitem.querySelector('label')).toHaveTextContent('姓名');
  expect(formitem.querySelector('.sinoui-helper-text')).toHaveTextContent(
    '必填',
  );
});

it('ref指向根元素', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormItem data-testid="formitem" ref={ref}>
        <input />
      </FormItem>
    </ThemeProvider>,
  );

  expect(ref.current).toBe(getByTestId('formitem'));
});

it('className', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormItem data-testid="formitem">
        <input />
      </FormItem>
    </ThemeProvider>,
  );

  expect(getByTestId('formitem')).toHaveClass(
    'sinoui-form-item',
    'sinoui-form-item--vertical',
  );
});

it('水平布局', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormItem data-testid="formitem" layout="horizontal">
        <input />
      </FormItem>
    </ThemeProvider>,
  );

  expect(getByTestId('formitem')).toHaveClass('sinoui-form-item--horizontal');

  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FormItem data-testid="formitem" layout="horizontal">
        <input />
      </FormItem>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('生成上下文', () => {
  let context: FormItemContextData | null | undefined;
  const Input = () => {
    context = useFormItemContext();
    return null;
  };

  render(
    <ThemeProvider theme={defaultTheme}>
      <FormItem colon required={false} error="校验错误" filled dense={false}>
        <Input />
      </FormItem>
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
