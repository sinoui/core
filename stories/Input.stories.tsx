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
          disabled
        />
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          readOnly
        />
        <TextInputField
          label="密码"
          onChange={onChange}
          value={value}
          type="password"
        />
      </div>
      <div style={{ display: 'flex' }}>
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
          variant="filled"
          disabled
        />
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          variant="filled"
          readOnly
        />
        <TextInputField
          label="密码"
          onChange={onChange}
          value={value}
          variant="filled"
          type="password"
        />
      </div>
      <div style={{ display: 'flex' }}>
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          required
          variant="outlined"
        />
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          variant="outlined"
          disabled
        />
        <TextInputField
          label="用户名"
          onChange={onChange}
          value={value}
          variant="outlined"
          readOnly
        />
        <TextInputField
          label="密码"
          onChange={onChange}
          value={value}
          variant="outlined"
          type="password"
        />
        <TextInputField
          label="密码"
          onChange={onChange}
          value="ggg"
          variant="outlined"
          type="password"
        />
      </div>
    </ThemeProvider>
  );
}

export const 标准Input = () => <SimpleInput />;
