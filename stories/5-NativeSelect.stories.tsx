import React, { useState } from 'react';
import NativeSelect from '@sinoui/core/NativeSelect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'NativeSelect',
};

export const 标准的NativeSelect = () => {
  const [value, setValue] = useState();
  return (
    <ThemeProvider theme={defaultTheme}>
      <NativeSelect
        label="标准选择框"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option aria-label="None" value="" />
        <option value="1">选项一</option>
        <option value="2">选项二</option>
        <option value="3">选项三</option>
      </NativeSelect>
    </ThemeProvider>
  );
};

export const 填充模式的NativeSelect = () => {
  const [value, setValue] = useState();
  return (
    <ThemeProvider theme={defaultTheme}>
      <NativeSelect
        label="填充模式选择框"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="filled"
      >
        <option aria-label="None" value="" />
        <option value="1">选项一</option>
        <option value="2">选项二</option>
        <option value="3">选项三</option>
      </NativeSelect>
    </ThemeProvider>
  );
};

export const 框模式的NativeSelect = () => {
  const [value, setValue] = useState();
  return (
    <ThemeProvider theme={defaultTheme}>
      <NativeSelect
        label="框模式选择框"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
      >
        <option aria-label="None" value="" />
        <option value="1">选项一</option>
        <option value="2">选项二</option>
        <option value="3">选项三</option>
      </NativeSelect>
    </ThemeProvider>
  );
};

export const 多选的NativeSelect = () => {
  const [value, setValue] = useState([]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <NativeSelect label="标准选择框" multiple>
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </NativeSelect>
        <NativeSelect
          label="填充模式选择框"
          multiple
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="filled"
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </NativeSelect>
        <NativeSelect
          multiple
          label="框模式选择框"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </NativeSelect>
      </div>
    </ThemeProvider>
  );
};
