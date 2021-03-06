import React, { useState } from 'react';
import NativeSelect from '@sinoui/core/NativeSelect';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const StyleNativeSelect = styled(NativeSelect)`
  width: 200px;
  margin: 8px;
`;

export default function NativeSelectDemo() {
  const [value, setValue] = useState('');

  const handleChange = (val: any) => {
    setValue(val);
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
          <StyleNativeSelect
            label="标准选择框"
            value={value}
            onChange={handleChange}
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Disabled"
            disabled
            value={value}
            onChange={handleChange}
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Error"
            required
            error
            errorText="必填"
            value={value}
            onChange={handleChange}
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Helper Text"
            helperText="帮助文本"
            value={value}
            onChange={handleChange}
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Dense"
            dense
            value={value}
            onChange={handleChange}
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect value={value} onChange={handleChange}>
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <StyleNativeSelect
            label="填充模式选择框"
            value={value}
            onChange={handleChange}
            variant="filled"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Disabled"
            disabled
            value={value}
            onChange={handleChange}
            variant="filled"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Error"
            required
            error
            errorText="必填"
            value={value}
            onChange={handleChange}
            variant="filled"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Helper Text"
            helperText="辅助性文字"
            value={value}
            onChange={handleChange}
            variant="filled"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Dense"
            dense
            value={value}
            onChange={handleChange}
            variant="filled"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            value={value}
            onChange={handleChange}
            variant="filled"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <StyleNativeSelect
            label="框模式选择框"
            value={value}
            onChange={handleChange}
            variant="outlined"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Disabled"
            disabled
            value={value}
            onChange={handleChange}
            variant="outlined"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Error"
            required
            error
            errorText="必填"
            value={value}
            onChange={handleChange}
            variant="outlined"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Helper Text"
            helperText="辅助性文字"
            value={value}
            onChange={handleChange}
            variant="outlined"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            label="Dense"
            dense
            value={value}
            onChange={handleChange}
            variant="outlined"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
          <StyleNativeSelect
            value={value}
            onChange={handleChange}
            variant="outlined"
          >
            <option value="1">选项一</option>
            <option value="2">选项二</option>
            <option value="3">选项三</option>
          </StyleNativeSelect>
        </div>
      </>
    </ThemeProvider>
  );
}
