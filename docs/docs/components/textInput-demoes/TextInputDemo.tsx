import React, { useState, useCallback } from 'react';
import TextInput from '@sinoui/core/TextInput';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const textInputStyle = {
  margin: 8,
};

function TextInputDemo() {
  const [value, setValue] = useState('');

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = event.target.value;
      setValue(inputValue);
    },
    [],
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          margin: '16px 0',
        }}
      >
        <TextInput
          label="标准输入框"
          value={value}
          onChange={onChange}
          style={textInputStyle}
        />
        <TextInput
          label="填充模式输入框"
          value={value}
          onChange={onChange}
          variant="filled"
          style={textInputStyle}
        />
        <TextInput
          label="轮廓输入框"
          value={value}
          onChange={onChange}
          variant="outlined"
          style={textInputStyle}
        />
      </div>
    </ThemeProvider>
  );
}

export default TextInputDemo;
