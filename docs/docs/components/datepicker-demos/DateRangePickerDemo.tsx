import React, { useState } from 'react';
import DateRangePicker from '@sinoui/core/DateRangePicker';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const StyledDateRangePicker = styled(DateRangePicker)`
  width: 100px;
  margin: 16px;
`;

export default function DateRangePickerDemo() {
  const [value, setValue] = useState(['2020-06-16', '2020-07-28']);
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledDateRangePicker value={value} onChange={setValue} />
      <StyledDateRangePicker
        value={value}
        onChange={setValue}
        variant="outlined"
      />
      <StyledDateRangePicker
        value={value}
        onChange={setValue}
        variant="filled"
      />
    </ThemeProvider>
  );
}
