/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Select, { transferSelectValueToAutoCompleteValue } from '../Select';
import Option from '../Option';
import { SelectItem } from '..';

afterEach(cleanup);

it('正确渲染三种模式下的下拉选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Select portal={false} label="Required" value={[]} multiple>
            <Option value="1">选项一</Option>
            <Option value="2">选项二</Option>
          </Select>
          <Select portal={false} label="Required" variant="filled">
            <Option value="1">选项一</Option>
            <Option value="2">选项二</Option>
          </Select>
          <Select portal={false} label="Required" variant="outlined">
            <Option value="1">选项一</Option>
            <Option value="2">选项二</Option>
          </Select>
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用的下拉框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Select portal={false} label="Required" disabled>
          <Option value="1">选项一</Option>
          <Option value="2">选项二</Option>
        </Select>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('点击选择框，出现选项弹窗', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select portal={false}>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  const select = container.querySelector('.sinoui-base-input__input')!;
  act(() => {
    fireEvent.click(select);
  });
  const optionList = container.querySelector(
    '.sinoui-auto-complete__option-list',
  );

  expect(optionList).toBeInTheDocument();
  expect(optionList?.querySelectorAll('.sinoui-list-item')).toHaveLength(3);
});

it('点击选择框，出现选项弹窗,并选中值', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select portal={false} value="1">
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="4">选项一</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  const select = container.querySelector('.sinoui-base-input__input')!;
  act(() => {
    fireEvent.click(select);
  });
  const optionList = container.querySelector(
    '.sinoui-auto-complete__option-list',
  );

  expect(optionList).toBeInTheDocument();
  expect(optionList?.querySelectorAll('.sinoui-list-item')).toHaveLength(4);
  expect(
    optionList?.querySelectorAll('.sinoui-list-item--selected'),
  ).toHaveLength(1);
});

it('点击某一项，选中此选项', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select portal={false} onChange={onChange}>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  const select = container.querySelector('.sinoui-base-input__input')!;
  act(() => {
    fireEvent.click(select);
  });

  expect(
    container.querySelector('.sinoui-auto-complete__option-list'),
  ).toBeInTheDocument();

  act(() => {
    fireEvent.click(container.querySelectorAll('.sinoui-list-item')[0]);
  });

  expect(onChange).toBeCalledWith('1');
});

it('点击清除按钮，清空值', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select portal={false} onChange={onChange} value="2">
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  const clearButton = container.querySelector('.sinoui-focused-visible')!;

  act(() => {
    fireEvent.click(clearButton);
  });

  expect(onChange).toBeCalledWith(null);
});

it('不可用时点击不弹框', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select portal={false} disabled>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  const select = container.querySelector('.sinoui-base-input__input')!;

  act(() => {
    fireEvent.click(select);
  });

  const optionList = container.querySelector(
    '.sinoui-auto-complete__option-list',
  );

  expect(optionList).toBeFalsy();
});

it('只读时点击不弹窗', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select portal={false} readOnly>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );
  const select = container.querySelector('.sinoui-base-input__input')!;

  act(() => {
    fireEvent.click(select);
  });
  const optionList = container.querySelector(
    '.sinoui-auto-complete__option-list',
  );
  expect(optionList).toBeFalsy();
});

it('allowClear = false', () => {
  const clearIcon = (
    <div data-testid="custom-close-icon">custom-close-icon</div>
  );

  const { queryByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select
        portal={false}
        autoCompleteProps={{
          clearIcon,
        }}
        value="1"
        allowClear={false}
      >
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  expect(queryByTestId('custom-close-icon')).toBeFalsy();
});

it('open = true', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select portal={false} open>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-auto-complete__option-list'),
  ).toBeTruthy();
});

describe('transferSelectValueToAutoCompleteValue', () => {
  const items = [
    {
      id: '1',
      value: '1',
      title: '选项1',
    },
    {
      id: '2',
      value: '2',
      title: '选项2',
    },
    {
      id: '3',
      value: '3',
      title: '选项3',
    },
  ];
  it('单选情况下且有指定的值', () => {
    const expected = items[0];

    const actual = transferSelectValueToAutoCompleteValue(items, false, '1');

    expect(actual).toBe(expected);
  });

  it('单选情况下未指定值', () => {
    const actual = transferSelectValueToAutoCompleteValue(items);

    expect(actual).toBe(undefined);
  });

  it('单选情况下指定了不存在的值', () => {
    const actual = transferSelectValueToAutoCompleteValue(
      items,
      false,
      'unknown',
    );

    expect(actual).toBe(undefined);
  });

  it('多选情况下指定了字符串值', () => {
    const expected = [items[0]];

    const actual = transferSelectValueToAutoCompleteValue(items, true, '1');

    expect(actual).toEqual(expected);
  });

  it('多选情况下指定了未知字符串值', () => {
    const expected: SelectItem[] = [];

    const actual = transferSelectValueToAutoCompleteValue(
      items,
      true,
      'unknown',
    );

    expect(actual).toEqual(expected);
  });

  it('多选情况下指定了字符串数组', () => {
    const expected: SelectItem[] = [items[0], items[1]];

    const actual = transferSelectValueToAutoCompleteValue(items, true, [
      '1',
      '2',
      'unknown',
    ]);

    expect(actual).toEqual(expected);
  });

  it('指定空字符串', () => {
    const actual = transferSelectValueToAutoCompleteValue(items, false, '');

    expect(actual).toBe(undefined);
  });
});
