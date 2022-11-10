/**
 * @jest-environment jsdom
 */
import 'jest-styled-components';

import { defaultTheme } from '@sinoui/theme';
import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import FormControl from '.';
import FormControlContext from './FormControlContext';
import FormLabel from './FormLabel';

afterEach(cleanup);

it('不同状态，不同颜色', () => {
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label">标签</FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.secondary.replace(/ +/g, ''),
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" disabled>
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.disabled.replace(/ +/g, ''),
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" focused>
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'color',
    defaultTheme.palette.primary.main.replace(/ +/g, ''),
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" error>
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'color',
    defaultTheme.palette.error.main.replace(/ +/g, ''),
  );

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel focused disabled data-testid="label">
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.disabled.replace(/ +/g, ''),
  );
});

it('必填', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" required>
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule('content', "'*'", {
    modifier: '::after',
  });
  expect(getByTestId('label')).toHaveStyleRule('padding', '4px', {
    modifier: '::after',
  });
});

it('在水平布局模式下，必填显示在左侧', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControl layout="horizontal">
        <FormLabel data-testid="label" required>
          标签
        </FormLabel>
      </FormControl>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule('content', "'*'", {
    modifier: '::before',
  });
  expect(getByTestId('label')).toHaveStyleRule('padding', '4px', {
    modifier: '::before',
  });
});

it('shrink layout', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="shrink">
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule('font-size', '0.75rem');
  expect(getByTestId('label')).toHaveStyleRule('padding-bottom', '4px');
});

it('className', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" className="x-label">
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveClass('x-label', 'sinoui-form-label');
});

it('从表单控件上下文中获取状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControlContext.Provider
        value={
          {
            colon: true,
            required: true,
            disabled: true,
            focused: true,
            layout: 'horizontal',
            id: 'input_1',
          } as any
        }
      >
        <FormLabel data-testid="label">标签</FormLabel>
      </FormControlContext.Provider>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveAttribute('for', 'input_1');
  expect(getByTestId('label')).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.disabled.replace(/ +/g, ''),
  );
});

it('floating layout', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating">
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  const label = getByTestId('label');
  expect(label).toHaveStyleRule('transform', 'translate(0px,24px) scale(1)');
  expect(label).toHaveStyleRule('will-change', 'transform');

  expect(label).toHaveStyleRule('white-space', 'nowrap');
  expect(label).toHaveStyleRule('text-overflow', 'ellipsis');
  expect(label).toHaveStyleRule('max-width', 'calc(100% - 24px)');
});

it('floating layout: 聚焦状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating" focused>
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'transform',
    'translate(0px,1.5px) scale(0.75)',
  );
});

it('floating label: 填充值状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating" filled>
        标签
      </FormLabel>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'transform',
    'translate(0px,1.5px) scale(0.75)',
  );
});

it('floating label: 填充输入框', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating" variant="filled">
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule('transform', 'translate(12px,20px) scale(1)');
});

it('floating label: 填充输入框，密集模式', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating" variant="filled" dense>
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule('transform', 'translate(12px,17px) scale(1)');
});

it('floating label: 填充输入框，密集模式，聚焦状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel
        data-testid="label"
        layout="floating"
        variant="filled"
        dense
        focused
      >
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule('transform', 'translate(12px,7px) scale(0.75)');
});

it('floating label: 填充输入框，聚焦状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating" variant="filled" focused>
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule('transform', 'translate(12px,9px) scale(0.75)');
});

it('floating label: 轮廓输入框', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating" variant="outlined">
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule('transform', 'translate(12px,20px) scale(1)');
});

it('floating label: 填充输入框，密集模式', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel data-testid="label" layout="floating" variant="outlined" dense>
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule('transform', 'translate(12px,12px) scale(1)');
});

it('floating label: 轮廓输入框，密集模式，聚焦状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel
        data-testid="label"
        layout="floating"
        variant="outlined"
        dense
        focused
      >
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule(
    'transform',
    'translate(12px,-6px) scale(0.75)',
  );
});

it('floating label: 轮廓输入框，聚焦状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormLabel
        data-testid="label"
        layout="floating"
        variant="outlined"
        focused
      >
        标签
      </FormLabel>
    </ThemeProvider>,
  );
  const label = getByTestId('label');

  expect(label).toHaveStyleRule(
    'transform',
    'translate(12px,-6px) scale(0.75)',
  );
});

it('从上下文中获取error状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControlContext.Provider
        value={
          {
            error: true,
          } as any
        }
      >
        <FormLabel data-testid="label">标签</FormLabel>
      </FormControlContext.Provider>
    </ThemeProvider>,
  );

  expect(getByTestId('label')).toHaveStyleRule(
    'color',
    defaultTheme.palette.error.main,
  );
});
