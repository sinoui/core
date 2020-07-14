import React, { useState } from 'react';
import DateRangePicker from '@sinoui/core/DateRangePicker';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const StyledDateRangePicker = styled(DateRangePicker)`
  width: 200px;
`;

export default function DateRangePickerDemo(props: any) {
  const [value, setValue] = useState(['2020-06-16', '2020-07-28']);
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledDateRangePicker
        {...props}
        value={value}
        onChange={(_value) => setValue(_value)}
      />
    </ThemeProvider>
  );
}
