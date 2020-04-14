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

  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
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
            required
            error="必填"
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            value={value}
            onChange={onChange}
            label="Helper Text"
            helperText="帮助文本"
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField value={value} onChange={onChange} label="Dense" dense>
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            value={value}
            onChange={onChange}
            label="AllowClear"
            allowClear
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
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
            label="Disabled"
            variant="filled"
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
            variant="filled"
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
            variant="filled"
            required
            error="必填"
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            variant="filled"
            value={value}
            onChange={onChange}
            label="Helper Text"
            helperText="帮助文本"
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            variant="filled"
            value={value}
            onChange={onChange}
            label="Dense"
            dense
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            variant="filled"
            value={value}
            onChange={onChange}
            label="AllowClear"
            allowClear
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
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
          <SelectField
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            value={value}
            onChange={onChange}
            label="Error"
            required
            error="必填"
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            variant="outlined"
            value={value}
            onChange={onChange}
            label="Helper Text"
            helperText="帮助文本"
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            variant="outlined"
            value={value}
            onChange={onChange}
            label="Dense"
            dense
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
          <SelectField
            variant="outlined"
            value={value}
            onChange={onChange}
            label="AllowClear"
            allowClear
          >
            <Option value="选项一">选项一</Option>
            <Option value="选项二">选项二</Option>
            <Option value="选项三">选项三</Option>
            <Option value="选项四">选项四</Option>
          </SelectField>
        </div>
      </>
    </ThemeProvider>
  );
}
