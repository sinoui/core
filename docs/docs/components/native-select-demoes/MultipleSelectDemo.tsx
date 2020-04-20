import React, { useState } from 'react';
import NativeSelect from '@sinoui/core/NativeSelect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default function MultipleSelectDemo() {
  const [value, setValue] = useState([]);

  const handleChange = (val: any) => {
    setValue(val);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <NativeSelect
          label="标准选择框"
          multiple
          value={value}
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </NativeSelect>
        <NativeSelect
          variant="filled"
          label="填充模式选择框"
          multiple
          value={value}
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </NativeSelect>
        <NativeSelect
          variant="outlined"
          multiple
          label="框模式选择框"
          value={value}
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          <option value="1">选项一</option>
          <option value="2">选项二</option>
          <option value="3">选项三</option>
        </NativeSelect>
      </div>
    </ThemeProvider>
  );
}
