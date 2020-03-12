import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Switch from '@sinoui/core/Switch';

export default {
  title: 'Switch',
};

export const 基本使用 = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback((event) => {
    setChecked(event.target.checked);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Switch checked={checked} value="switch1" onChange={handleChange} />
    </ThemeProvider>
  );
};

export const 切换颜色 = () => {
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
};

export const 不可用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <Switch disabled value="switch1" />
      <Switch disabled checked value="switch2" />
    </>
  </ThemeProvider>
);
