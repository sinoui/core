import React, { useState } from 'react';
import Select, { Option } from '@sinoui/core/Select';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'Select',
};

function SimpleDemo() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onBlur = () => {
    setOpen(false);
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      open={open}
      onOpen={onOpen}
      onBlur={onBlur}
    >
      <Option value="选项一">选项一</Option>
      <Option value="选项二">选项二</Option>
      <Option value="选项三">选项三</Option>
      <Option value="选项四">选项四</Option>
    </Select>
  );
}

export const 基础下拉框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <SimpleDemo />
  </ThemeProvider>
);
