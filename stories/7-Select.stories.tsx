import React, { useState } from 'react';
import Select, { Option } from '@sinoui/core/Select';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'Select',
};

function SimpleDemo() {
  const [value, setValue] = useState('');

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ marginLeft: 16, display: 'flex', alignItems: 'center' }}>
      <Select value={value} onChange={onChange} label="Required">
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
      <Select
        value={value}
        onChange={onChange}
        variant="filled"
        label="Required"
      >
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
      <Select
        value={value}
        onChange={onChange}
        variant="outlined"
        label="Required"
      >
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
    </div>
  );
}

function MultipleSelectDemo() {
  const [value, setValue] = useState([]);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ marginLeft: 16, display: 'flex', alignItems: 'center' }}>
      <Select value={value} onChange={onChange} multiple label="Multiple">
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
      <Select
        value={value}
        onChange={onChange}
        multiple
        variant="filled"
        label="Multiple"
      >
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
      <Select
        value={value}
        onChange={onChange}
        multiple
        variant="outlined"
        label="Multiple"
      >
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
    </div>
  );
}

export const 基础下拉框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <SimpleDemo />
  </ThemeProvider>
);

export const 多选下拉框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <MultipleSelectDemo />
  </ThemeProvider>
);
