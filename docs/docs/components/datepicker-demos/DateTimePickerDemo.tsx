import React, { useState } from 'react';
import DateTimePicker from '@sinoui/core/DateTimePicker';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const StyledDateTimePicker = styled(DateTimePicker)`
  width: 200px;
`;

export default function DateTimePickerDemo() {
  const [value, setValue] = useState<string | undefined>('2020-06-18 15:30');
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledDateTimePicker value={value} onChange={setValue} />
    </ThemeProvider>
  );
}
