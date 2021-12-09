import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import ToggleButton from '@sinoui/core/ToggleButton';
import ToggleButtonGroup from '@sinoui/core/ToggleButtonGroup';

export default function ToggleButtonWithColor() {
  const [selected, setSelected] = useState<string>('web');
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <ToggleButtonGroup
          color="primary"
          value={selected}
          onChange={setSelected as any}
        >
          <ToggleButton value="web">web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">ios</ToggleButton>
        </ToggleButtonGroup>
        <br />
        <ToggleButtonGroup
          color="secondary"
          value={selected}
          onChange={setSelected as any}
        >
          <ToggleButton value="web">web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">ios</ToggleButton>
        </ToggleButtonGroup>
        <br />
        <ToggleButtonGroup
          color="info"
          value={selected}
          onChange={setSelected as any}
        >
          <ToggleButton value="web">web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">ios</ToggleButton>
        </ToggleButtonGroup>
      </>
    </ThemeProvider>
  );
}
