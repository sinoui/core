import React from 'react';
import { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import SelectInput from '../SelectInput';
import Option from '../Option';

it('单选时，点击选项，onClose被调用', () => {
  const onClose = jest.fn();
  const onOpen = jest.fn();
  const { getByRole, getAllByRole } = render(
    <ThemeProvider theme={defaultTheme}>
      <SelectInput value="1" open onClose={onClose} autoFocus onOpen={onOpen}>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
      </SelectInput>
    </ThemeProvider>,
  );

  expect(getByRole('listbox')).toBeInTheDOM();

  act(() => {
    fireEvent.click(getAllByRole('option')[0]);
  });

  expect(onClose).toHaveBeenCalled();
});

it('复选时，点击选中', () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  const { getAllByRole, getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <SelectInput
        value={['1']}
        open
        multiple
        dense
        variant="filled"
        onChange={onChange}
        onClose={onClose}
      >
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </SelectInput>
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getAllByRole('option')[1]);
    fireEvent.click(getAllByRole('option')[0]);
  });

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onClose).not.toHaveBeenCalled();

  act(() => {
    fireEvent.click(getByTestId('Backdrop'));
  });

  expect(onClose).toHaveBeenCalled();
});

it('单选时，打开弹窗，直接按enter键，弹窗关闭，onChange被调用', () => {
  const onClose = jest.fn();
  const onChange = jest.fn();
  const { getAllByRole } = render(
    <ThemeProvider theme={defaultTheme}>
      <SelectInput
        value="1"
        open
        onClose={onClose}
        dense
        variant="outlined"
        onChange={onChange}
      >
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
      </SelectInput>
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.keyDown(getAllByRole('option')[0], { keyCode: 13 });
  });

  expect(onClose).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalled();
});

it('复选时，使用方向键和Enter键切换选中项', () => {
  const onChange = jest.fn();
  const onClose = jest.fn();

  const { getAllByRole, getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <SelectInput
        value={['1']}
        open
        multiple
        dense
        variant="filled"
        onChange={onChange}
        onClose={onClose}
      >
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </SelectInput>
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.keyDown(getAllByRole('option')[0], { keyCode: 13 });
    fireEvent.keyDown(getAllByRole('option')[0], { keyCode: 40 });
    fireEvent.keyDown(getAllByRole('option')[0], { keyCode: 13 });
  });

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onClose).not.toHaveBeenCalled();

  act(() => {
    fireEvent.click(getByTestId('Backdrop'));
  });

  expect(onClose).toHaveBeenCalled();
});

it('关闭弹窗后,失去焦点时，onBlur被调用', () => {
  const onBlur = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <SelectInput value="1" onBlur={onBlur} autoFocus>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
      </SelectInput>
    </ThemeProvider>,
  );

  fireEvent.blur(getByTestId('SelectDisplay'));
  expect(onBlur).toHaveBeenCalled();
});
