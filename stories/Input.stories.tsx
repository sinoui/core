import React, { useState, useCallback } from 'react';
import TextInputField from '@sinoui/core/TextInput';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'Input',
};

function SimpleInput() {
  const [value, setValue] = useState();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = event.target.value;
      setValue(inputValue);
    },
    [],
  );
  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ display: 'flex' }}>
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          required
        />
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          required
          variant="filled"
        />
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          required
          variant="outlined"
        />
      </div>
    </ThemeProvider>
  );
}

export const 标准Input = () => <SimpleInput />;
