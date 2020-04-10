import React, { useState, useCallback } from 'react';
import TextInput from '@sinoui/core/TextInput';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import InputAdornment from '@sinoui/core/InputAdornment';
import IconButton from '@sinoui/core/IconButton';
import Search from '@sinoui/icons/Search';

const TextInputField = styled(TextInput)`
  width: 200px;
  margin: 8px;

  > .sinoui-outlined-input > fieldset {
    border-radius: 48px;
  }

  & .sinoui-input-adornment {
    margin-right: 0px;
  }

  & input {
    margin-left: -8px;
  }
`;

const DenseIconButton = styled(IconButton)`
  width: 32px;
  height: 32px;
  margin-left: 8px;

  > .sinoui-icon-button__ripple-layout {
    left: 0px;
    top: 0px;
    width: 32px;
    height: 32px;
  }

  > .sinoui-icon-button__ripple-layout > .sinoui-icon-button__ripple {
    width: 32px;
    height: 32px;
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
        variant="outlined"
        placeholder="请输出查询内容"
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <DenseIconButton onClick={() => alert(value)}>
              <Search />
            </DenseIconButton>
          </InputAdornment>
        }
      />
    </ThemeProvider>
  );
}

export default SearchInputDemo;
