import React, { useState } from 'react';
import TimePicker from '@sinoui/core/TimePicker';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default function DatePickerDemo(props: any) {
  const [value, setValue] = useState<string | undefined>('14:20');
  return (
    <ThemeProvider theme={defaultTheme}>
      <TimePicker
        value={value}
        onChange={(_value) => setValue(_value)}
        {...props}
      />
    </ThemeProvider>
  );
}
