import React, { useState } from 'react';
import NativeSelect from '@sinoui/core/NativeSelect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'NativeSelect',
};

export const 标准的NativeSelect = () => (
  <ThemeProvider theme={defaultTheme}>
    <NativeSelect onChange={(e) => console.log(e.target.value)}>
      <option value="1">选项一</option>
      <option value="2">选项二</option>
      <option value="3">选项三</option>
    </NativeSelect>
  </ThemeProvider>
);
