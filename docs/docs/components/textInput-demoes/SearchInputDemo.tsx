import React, { useState, useCallback } from 'react';
import TextInput from '@sinoui/core/TextInput';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import InputAdornment from '@sinoui/core/InputAdornment';
import Search from '@sinoui/icons/Search';

const TextInputField = styled(TextInput)`
  width: 200px;

  .sinoui-notched-outline__leading {
    width: 40px;
    border-radius: 48px 0 0 48px;
  }

  .sinoui-notched-outline__trailing {
    border-radius: 0 48px 48px 0;
  }

  input {
    padding-right: 16px;
  }
`;

function SearchInputDemo() {
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
      <TextInputField
        dense
        variant="outlined"
        placeholder="请输出查询内容"
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <Search color="textHint" />
          </InputAdornment>
        }
      />
    </ThemeProvider>
  );
}

export default SearchInputDemo;
