import React, { useState } from 'react';
import NativeSelect from '@sinoui/core/NativeSelect';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const StyleNativeSelect = styled(NativeSelect)`
  width: 200px;
  margin: 8px;
`;

export default function SimpleDemo() {
  const [value, setValue] = useState();

  return (
    <ThemeProvider theme={defaultTheme}>
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
          onChange={(e) => setValue(e.target.value)}
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </StyleNativeSelect>
        <StyleNativeSelect
          variant="filled"
          label="填充模式选择框"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </StyleNativeSelect>
        <StyleNativeSelect
          variant="outlined"
          label="框模式选择框"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </StyleNativeSelect>
      </div>
    </ThemeProvider>
  );
}
