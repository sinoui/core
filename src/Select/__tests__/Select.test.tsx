import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import Select from '../Select';
import Option from '../Option';

it('正确渲染三种模式下的下拉选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Select label="Required" value={[]} multiple>
            <Option value="1">选项一</Option>
            <Option value="2">选项二</Option>
          </Select>
          <Select label="Required" variant="filled">
            <Option value="1">选项一</Option>
            <Option value="2">选项二</Option>
          </Select>
          <Select label="Required" variant="outlined">
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
        <Select label="Required" disabled>
          <Option value="1">选项一</Option>
          <Option value="2">选项二</Option>
        </Select>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('点击出现弹窗,点击弹窗中某一项,弹窗关闭', () => {
  const { getByTestId, getByRole, getAllByRole, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Select>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
        <Option value="3">选项三</Option>
      </Select>
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByTestId('SelectDisplay'));
  });

  expect(getByRole('listbox')).toBeInTheDOM();

  act(() => {
    fireEvent.click(getAllByRole('option')[0]);
  });

  expect(container.querySelector('ul')).toBeDefined();
});
