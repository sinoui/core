import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import ToggleButton from '@sinoui/core/ToggleButton';
import Done from '@sinoui/icons/Done';

export default function SingleToggleButton() {
  const [selected, setSelected] = useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => setSelected(!selected)}
      >
        <Done />
      </ToggleButton>
    </ThemeProvider>
  );
}
