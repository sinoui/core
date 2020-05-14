/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { config } from 'react-transition-group';
import SelectInput from '../SelectInput';
import Option from '../Option';

beforeAll(() => {
  config.disabled = true;
});

afterAll(() => {
  config.disabled = false;
});

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
      <SelectInput value="1" open onClose={onClose} onChange={onChange}>
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
      <SelectInput
        value="1"
        onBlur={onBlur}
        autoFocus
        data-testid="selectInput"
      >
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
      </SelectInput>
    </ThemeProvider>,
  );

  fireEvent.blur(getByTestId('selectInput'));
  expect(onBlur).toHaveBeenCalled();
});

it('选择框聚焦状态下，按下enter键，onOpen被调用', () => {
  const onOpen = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <SelectInput value="1" onOpen={onOpen} data-testid="selectInput">
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
      </SelectInput>
    </ThemeProvider>,
  );

  fireEvent.focus(getByTestId('selectInput'));
  fireEvent.keyDown(getByTestId('selectInput'), { keyCode: 13 });

  expect(onOpen).toHaveBeenCalled();
});

describe('tabindex', () => {
  it('可用时有tabindex', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <SelectInput data-testid="selectInput" />
      </ThemeProvider>,
    );

    expect(getByTestId('selectInput')).toHaveAttribute('tabIndex', '0');
  });

  it('只读时有tabindex', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <SelectInput readOnly data-testid="selectInput" />
      </ThemeProvider>,
    );

    expect(getByTestId('selectInput')).toHaveAttribute('tabIndex', '0');
  });

  it('tabIndex属性', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <SelectInput data-testid="selectInput" tabIndex={2} />
      </ThemeProvider>,
    );

    expect(getByTestId('selectInput')).toHaveAttribute('tabIndex', '2');
  });

  it('不可用时无tabindex', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <SelectInput disabled data-testid="selectInput" />
      </ThemeProvider>,
    );

    expect(getByTestId('selectInput')).not.toHaveAttribute('tabIndex');
  });
});
