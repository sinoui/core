import React, { useState } from 'react';
import Select, { Option } from '@sinoui/core/Select';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const SelectField = styled(Select)`
  margin: 8px;
  width: 200px;
`;

export default function SimpleDemo() {
  const [value, setValue] = useState('');

  const onChange = (val: any) => {
    setValue(val);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <SelectField value={value} onChange={onChange} label="Select">
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          label="Select"
          variant="filled"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          label="Select"
          variant="outlined"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
      </div>
    </ThemeProvider>
  );
}
