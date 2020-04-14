import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import NativeSelect from '../NativeSelect';

it('渲染三种模式下的选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <NativeSelect label="标准选择框">
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect label="填充模式选择框" variant="filled">
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect label="框模式选择框" variant="outlined">
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染多选选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <NativeSelect label="标准选择框" multiple>
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect label="填充模式选择框" variant="filled" multiple>
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect label="框模式选择框" variant="outlined" multiple>
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染有辅助性文字的选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <NativeSelect label="标准选择框" helperText="原生选择框">
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect
            label="填充模式选择框"
            variant="filled"
            helperText="原生选择框"
          >
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect
            label="框模式选择框"
            variant="outlined"
            helperText="原生选择框"
          >
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染有错误提示的选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <NativeSelect label="标准选择框" required error="必填">
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect
            label="填充模式选择框"
            variant="filled"
            required
            error="必填"
          >
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect
            label="框模式选择框"
            variant="outlined"
            required
            error="必填"
          >
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用的选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <NativeSelect label="标准选择框" disabled>
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect label="填充模式选择框" variant="filled" disabled>
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect label="框模式选择框" variant="outlined" disabled>
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不带标签的选择框', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <NativeSelect>
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect variant="filled">
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
          <NativeSelect variant="outlined">
            <option aria-label="None" value="" />
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </NativeSelect>
        </div>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
