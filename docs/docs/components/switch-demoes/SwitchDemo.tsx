import React, { useState, useCallback } from 'react';
import Switch from '@sinoui/core/Switch';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback((event) => {
    setChecked(event.target.checked);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Switch checked={checked} value="switch1" onChange={handleChange} />
    </ThemeProvider>
  );
}

export default SwitchDemo;
