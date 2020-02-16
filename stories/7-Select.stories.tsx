import React, { useState } from 'react';
import Select, { Option } from '@sinoui/core/Select';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdArrowDropDown } from 'react-icons/md';

export default {
  title: 'Select',
};

function SimpleDemo() {
  const [value, setValue] = useState('');

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Select value={value} onChange={onChange}>
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
      <Select value={value} onChange={onChange} variant="filled">
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </Select>
      <Select value={value} onChange={onChange} variant="outlined">
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
