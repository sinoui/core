import React, { useState, useCallback } from 'react';
import Switch from '@sinoui/core/Switch';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default function ColorfulDemo() {
  const [checked, setChecked] = useState<{ [name: string]: boolean }>({
    switch3: true,
  });
  const handleChange = useCallback((event, name) => {
    const value = event.target.checked;
    setChecked((state) => ({ ...state, [name]: value }));
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Switch
          checked={checked.switch1}
          value="switch1"
          onChange={(event) => handleChange(event, 'switch1')}
        />
        <Switch
          checked={checked.switch2}
          value="switch2"
          onChange={(event) => handleChange(event, 'switch2')}
          color="secondary"
        />
        <Switch
          checked={checked.switch3}
          value="switch3"
          onChange={(event) => handleChange(event, 'switch3')}
          color="success"
        />
        <Switch
          checked={checked.switch4}
          value="switch4"
          onChange={(event) => handleChange(event, 'switch4')}
          color="error"
        />
        <Switch
          checked={checked.switch5}
          value="switch5"
          onChange={(event) => handleChange(event, 'switch5')}
          color="info"
        />
        <Switch
          checked={checked.switch6}
          value="switch6"
          onChange={(event) => handleChange(event, 'switch6')}
          color="warning"
        />
      </>
    </ThemeProvider>
  );
}
