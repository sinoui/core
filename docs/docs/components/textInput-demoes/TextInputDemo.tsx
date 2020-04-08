import React, { useState, useCallback } from 'react';
import TextInput from '@sinoui/core/TextInput';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

function TextInputDemo() {
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
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <TextInput label="标准输入框" value={value} onChange={onChange} />
        <TextInput
          label="填充模式输入框"
          value={value}
          onChange={onChange}
          variant="filled"
        />
        <TextInput
          label="带边框的输入框"
          value={value}
          onChange={onChange}
          variant="outlined"
        />
      </div>
    </ThemeProvider>
  );
}

export default TextInputDemo;
