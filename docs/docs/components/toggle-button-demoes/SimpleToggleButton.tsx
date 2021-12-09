import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import ToggleButton from '@sinoui/core/ToggleButton';
import ToggleButtonGroup from '@sinoui/core/ToggleButtonGroup';
import FormatAlignLeft from '@sinoui/icons/FormatAlignLeft';
import FormatAlignRight from '@sinoui/icons/FormatAlignRight';
import FormatAlignCenter from '@sinoui/icons/FormatAlignCenter';
import FormatAlignJustify from '@sinoui/icons/FormatAlignJustify';

export default function SimpleToggeleButtonDemo(props: any) {
  const [selected, setSelected] = useState('');
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup
        value={selected}
        onChange={setSelected as any}
        {...props}
      >
        <ToggleButton value="left">
          <FormatAlignLeft />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenter />
        </ToggleButton>
        <ToggleButton value="right">
          <FormatAlignRight />
        </ToggleButton>
        <ToggleButton value="justify">
          <FormatAlignJustify />
        </ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
