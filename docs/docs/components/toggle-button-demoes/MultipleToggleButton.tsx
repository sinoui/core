import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import ToggleButton from '@sinoui/core/ToggleButton';
import ToggleButtonGroup from '@sinoui/core/ToggleButtonGroup';
import FormatBold from '@sinoui/icons/FormatBold';
import FormatItalic from '@sinoui/icons/FormatItalic';
import FormatUnderlined from '@sinoui/icons/FormatUnderlined';
import FormatClear from '@sinoui/icons/FormatClear';

export default function MultipleDemo() {
  const [selected, setSelected] = useState(['bold']);
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup
        multiple
        value={selected}
        onChange={setSelected as any}
      >
        <ToggleButton value="bold">
          <FormatBold />
        </ToggleButton>
        <ToggleButton value="italic">
          <FormatItalic />
        </ToggleButton>
        <ToggleButton value="underLine">
          <FormatUnderlined />
        </ToggleButton>
        <ToggleButton value="clear" disabled>
          <FormatClear />
        </ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
