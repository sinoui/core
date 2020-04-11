import React, { useState, useCallback } from 'react';
import TextInput from '@sinoui/core/TextInput';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import InputAdornment from '@sinoui/core/InputAdornment';
import Star from '@sinoui/icons/Star';
import Visibility from '@sinoui/icons/Visibility';

export default {
  title: 'TextInput',
};

const TextInputField = styled(TextInput)`
  margin: 8px;
  width: 200px;
`;

function SimpleInput() {
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
          label="Required"
          onChange={onChange}
          value={value}
          required
        />
        <TextInputField
          label="Disabled"
          onChange={onChange}
          value={value}
          disabled
        />
        <TextInputField
          label="ReadOnly"
          onChange={onChange}
          value={value}
          readOnly
        />
        <TextInputField
          label="Error"
          onChange={onChange}
          value={value}
          error="Error Message"
        />
        <TextInputField
          label="Password"
          onChange={onChange}
          value={value}
          type="password"
        />
        <TextInputField
          label="Help Text"
          onChange={onChange}
          value={value}
          helperText="请输入内容"
        />
        <TextInputField
          label="Dense"
          onChange={onChange}
          value={value}
          dense
          helperText="请输入内容"
        />
        <TextInputField
          label="Multiline"
          multiline
          value={value}
          onChange={onChange}
        />
      </div>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}
      >
        <TextInputField
          label="Required"
          onChange={onChange}
          value={value}
          required
          variant="filled"
        />
        <TextInputField
          label="Disabled"
          onChange={onChange}
          value={value}
          variant="filled"
          disabled
        />
        <TextInputField
          label="ReadOnly"
          onChange={onChange}
          value={value}
          variant="filled"
          readOnly
        />
        <TextInputField
          label="Error"
          onChange={onChange}
          value={value}
          variant="filled"
          error="Error Message"
        />
        <TextInputField
          label="Password"
          onChange={onChange}
          value={value}
          variant="filled"
          type="password"
        />
        <TextInputField
          label="Help Text"
          onChange={onChange}
          value={value}
          variant="filled"
          helperText="请输入内容"
        />
        <TextInputField
          label="Dense"
          variant="filled"
          onChange={onChange}
          value={value}
          dense
          helperText="请输入内容"
        />
        <TextInputField
          label="Multiline"
          multiline
          variant="filled"
          value={value}
          onChange={onChange}
        />
      </div>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}
      >
        <TextInputField
          label="Required"
          onChange={onChange}
          value={value}
          required
          variant="outlined"
        />
        <TextInputField
          label="Disabled"
          onChange={onChange}
          value={value}
          variant="outlined"
          disabled
        />
        <TextInputField
          label="ReadOnly"
          onChange={onChange}
          value={value}
          variant="outlined"
          readOnly
        />
        <TextInputField
          label="Error"
          onChange={onChange}
          value={value}
          variant="outlined"
          error="Error Message"
        />
        <TextInputField
          label="Password"
          onChange={onChange}
          value={value}
          variant="outlined"
          type="password"
        />
        <TextInputField
          label="Help Text"
          onChange={onChange}
          value={value}
          variant="outlined"
          helperText="请输入内容"
        />
        <TextInputField
          label="Dense"
          onChange={onChange}
          value={value}
          dense
          variant="outlined"
          helperText="请输入内容"
        />
        <TextInputField
          label="Multiline"
          multiline
          variant="outlined"
          value={value}
          onChange={onChange}
        />
      </div>
    </ThemeProvider>
  );
}

function AdornmentInput() {
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
          label="金额"
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
          disabled
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
          label="金额"
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
          disabled
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
          label="金额"
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
          disabled
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

export const 标准Input = () => <SimpleInput />;

export const 轮廓输入框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <TextInput variant="outlined" value="张三" label="姓名" />
      <TextInput variant="outlined" label="姓名" />
    </div>
  </ThemeProvider>
);

export const 带装饰器的Input = () => <AdornmentInput />;

export const 不带标签的输入框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <TextInput variant="outlined" />
      <TextInput variant="outlined" label="" />
    </div>
  </ThemeProvider>
);
