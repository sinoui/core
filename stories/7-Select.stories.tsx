import React, { useState } from 'react';
import Select, { Option } from '@sinoui/core/Select';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'Select',
};

const SelectField = styled(Select)`
  margin: 8px;
  width: 200px;
`;

function SimpleDemo() {
  const [value, setValue] = useState('');

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div
        style={{
          marginLeft: 16,
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <SelectField
          value={value}
          onChange={onChange}
          label="Required"
          required
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          label="Disabled"
          disabled
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          label="ReadOnly"
          readOnly
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          label="Error"
          error="Error Message"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          label="Help Text"
          helperText="请选择内容"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          label="Dense"
          dense
          helperText="请选择内容"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
      </div>
      <div
        style={{
          marginLeft: 16,
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <SelectField
          value={value}
          onChange={onChange}
          variant="filled"
          label="Required"
          required
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="filled"
          label="Disabled"
          disabled
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="filled"
          label="ReadOnly"
          readOnly
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="filled"
          label="Error"
          error="Error Message"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="filled"
          label="Help Text"
          helperText="请选择内容"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="filled"
          label="Dense"
          dense
          helperText="请选择内容"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
      </div>
      <div
        style={{
          marginLeft: 16,
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <SelectField
          value={value}
          onChange={onChange}
          variant="outlined"
          label="Required"
          required
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="outlined"
          label="Disabled"
          disabled
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="outlined"
          label="ReadOnly"
          readOnly
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="outlined"
          label="Error"
          error="Error Message"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="outlined"
          label="Help Text"
          helperText="请选择内容"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
        <SelectField
          value={value}
          onChange={onChange}
          variant="outlined"
          label="Dense"
          dense
          helperText="请选择内容"
        >
          <Option value="选项一">选项一</Option>
          <Option value="选项二">选项二</Option>
          <Option value="选项三">选项三</Option>
          <Option value="选项四">选项四</Option>
        </SelectField>
      </div>
    </>
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
