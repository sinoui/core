import React, { useState } from 'react';
import Select, { Option } from '@sinoui/core/Select';
import styled, { ThemeProvider } from 'styled-components';
import {
  defaultTheme,
  createPalette,
  createTheme,
  colors,
} from '@sinoui/theme';
import Checkbox from '@sinoui/core/Checkbox';

export default {
  title: 'Select',
};

const SelectField = styled(Select)`
  margin: 8px;
  width: 200px;
`;

const theme = createTheme({
  palette: createPalette({
    primary: colors.purple, // 主色调
  }),
});

function SimpleDemo() {
  const [value, setValue] = useState('');

  const onChange = (val: any) => {
    setValue(val);
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
          <Option value="选项五">选项一</Option>
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
          error
          errorText="Error Message"
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
          errorText="Error Message"
          error
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
          errorText="Error Message"
          error
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

  const onChange = (val: any) => {
    setValue(val);
  };

  return (
    <div style={{ marginLeft: 16, display: 'flex', alignItems: 'flex-start' }}>
      <SelectField value={value} onChange={onChange} multiple label="Multiple">
        <Option value="选项一">选项一</Option>
        <Option value="选项二">选项二</Option>
        <Option value="选项三">选项三</Option>
        <Option value="选项四">选项四</Option>
      </SelectField>
      <SelectField
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
      </SelectField>
      <SelectField
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
      </SelectField>
    </div>
  );
}

export const 基础下拉框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <SimpleDemo />
  </ThemeProvider>
);

export const 多选下拉框 = () => (
  <ThemeProvider theme={theme}>
    <MultipleSelectDemo />
  </ThemeProvider>
);

export const autoFocus = () => (
  <ThemeProvider theme={theme}>
    <SelectField multiple variant="outlined" label="Multiple" autoFocus>
      <Option value="选项一">选项一</Option>
      <Option value="选项二">选项二</Option>
      <Option value="选项五">选项一</Option>
      <Option value="选项三">选项三</Option>
      <Option value="选项四">选项四</Option>
    </SelectField>
  </ThemeProvider>
);

const options = [
  { id: '1', title: '选项一' },
  { id: '2', title: '选项二' },
  { id: '3', title: '选项三' },
  { id: '4', title: '选项四' },
];

function CustomDemo() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <SelectField
      multiple
      value={value}
      onChange={(newValue) => setValue(newValue as string[])}
    >
      {options.map((option) => (
        <Option key={option.id} value={option.id} title={option.title}>
          <Checkbox checked={value && value.indexOf(option.id) !== -1} />
          {option.title}
        </Option>
      ))}
    </SelectField>
  );
}

export const 自定义选择框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <CustomDemo />
  </ThemeProvider>
);
