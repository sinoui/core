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

  .sinoui-notched-outline__leading {
    width: 40px;
    border-radius: 48px 0 0 48px;
  }

  .sinoui-notched-outline__trailing {
    border-radius: 0 48px 48px 0;
  }
`;

const DenseIconButton = styled(IconButton)`
  width: 24px;
  height: 24px;

  > .sinoui-icon-button__ripple-layout {
    left: -4px;
    top: -4px;
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
        dense
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
