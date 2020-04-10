import React, { useState, useCallback } from 'react';
import TextInput from '@sinoui/core/TextInput';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import InputAdornment from '@sinoui/core/InputAdornment';
import Star from '@sinoui/icons/Star';
import Visibility from '@sinoui/icons/Visibility';

const TextInputField = styled(TextInput)`
  margin: 8px;
  width: 200px;
`;

function AdornmentInputDemo() {
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
        style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}
      >
        <TextInputField
          value={value}
          onChange={onChange}
          label="金额"
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
        />
        <TextInputField
          value={value}
          onChange={onChange}
          label="Label"
          startAdornment={
            <InputAdornment position="start">
              <Star color="textSecondary" />
            </InputAdornment>
          }
        />
        <TextInputField
          value={value}
          onChange={onChange}
          label="重量"
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          align="end"
        />
        <TextInputField
          value={value}
          onChange={onChange}
          label="Label"
          endAdornment={
            <InputAdornment position="end">
              <Visibility color="textSecondary" />
            </InputAdornment>
          }
        />
      </div>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}
      >
        <TextInputField
          variant="filled"
          value={value}
          onChange={onChange}
          label="金额"
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
        />
        <TextInputField
          variant="filled"
          value={value}
          onChange={onChange}
          label="Label"
          startAdornment={
            <InputAdornment position="start">
              <Star color="textSecondary" />
            </InputAdornment>
          }
        />
        <TextInputField
          variant="filled"
          value={value}
          onChange={onChange}
          label="重量"
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
        />
        <TextInputField
          variant="filled"
          value={value}
          onChange={onChange}
          label="Label"
          endAdornment={
            <InputAdornment position="end">
              <Visibility color="textSecondary" />
            </InputAdornment>
          }
        />
      </div>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}
      >
        <TextInputField
          variant="outlined"
          value={value}
          onChange={onChange}
          label="金额"
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
        />
        <TextInputField
          variant="outlined"
          value={value}
          onChange={onChange}
          label="Label"
          startAdornment={
            <InputAdornment position="start">
              <Star color="textSecondary" />
            </InputAdornment>
          }
        />
        <TextInputField
          variant="outlined"
          value={value}
          onChange={onChange}
          label="重量"
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
        />
        <TextInputField
          variant="outlined"
          value={value}
          onChange={onChange}
          label="Label"
          endAdornment={
            <InputAdornment position="end">
              <Visibility color="textSecondary" />
            </InputAdornment>
          }
        />
      </div>
    </ThemeProvider>
  );
}

export default AdornmentInputDemo;
