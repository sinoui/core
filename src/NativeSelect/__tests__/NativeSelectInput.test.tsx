import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent, act } from '@testing-library/react';

import 'jest-styled-components';
import NativeSelectInput from '../NativeSelectInput';

it('渲染原生选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <NativeSelectInput>
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
        </NativeSelectInput>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <NativeSelectInput disabled>
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
        </NativeSelectInput>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染多选选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <NativeSelectInput multiple>
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
        </NativeSelectInput>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('值变更时，onChange被调用', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <NativeSelectInput onChange={onChange}>
        <option value="1">选项一</option>
        <option value="2">选项二</option>
        <option value="3">选项三</option>
        <option value="4">选项四</option>
      </NativeSelectInput>
    </ThemeProvider>,
  );

  const select = container.querySelector('select') as HTMLSelectElement;

  act(() => {
    fireEvent.change(select, { target: { value: '1' } });
  });

  expect(onChange).toHaveBeenCalledWith('1');
});

it('多选值变更时，onChange被调用', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <NativeSelectInput onChange={onChange} value={['1', '3']} multiple>
        <option value="1">选项一</option>
        <option value="2">选项二</option>
        <option value="3">选项三</option>
        <option value="4">选项四</option>
      </NativeSelectInput>
    </ThemeProvider>,
  );

  const select = container.querySelector('select') as HTMLSelectElement;

  act(() => {
    (select.querySelector(
      'option[value="1"]',
    ) as HTMLOptionElement).selected = true;
    (select.querySelector(
      'option[value="2"]',
    ) as HTMLOptionElement).selected = true;
    (select.querySelector(
      'option[value="3"]',
    ) as HTMLOptionElement).selected = false;
    fireEvent.change(select);
  });

  expect(onChange).toHaveBeenCalledWith(['1', '2']);
});
