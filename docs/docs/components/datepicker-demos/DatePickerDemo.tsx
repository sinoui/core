import React, { useState } from 'react';
import DatePicker from '@sinoui/core/DatePicker';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const StyledDatePicker = styled(DatePicker)`
  width: 200px;
`;

export default function DatePickerDemo(props: any) {
  const [value, setValue] = useState<string | undefined>('2020-06-12');
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledDatePicker
        value={value}
        onChange={(_value) => setValue(_value)}
        {...props}
      />
    </ThemeProvider>
  );
}
