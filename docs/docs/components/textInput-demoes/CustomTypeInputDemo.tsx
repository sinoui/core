import React, { useState } from 'react';
import TextInput from '@sinoui/core/TextInput';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import type { TextInputProps } from '@sinoui/core/TextInput';
import { Row, Column } from '@sinoui/core/Grid';

const StyledTextInput = styled(TextInput)`
  width: 200px;
  margin: 8px;
`;

const StateTextInput = (props: TextInputProps) => {
  const [value, setValue] = useState('');

  return (
    <StyledTextInput
      variant="outlined"
      {...props}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

function CustomTypeInputDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Row>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput
            type="number"
            inputProps={{
              min: 10,
              max: 20,
            }}
            label="数字输入框"
          />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="date" label="日期选择" shrink />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="datetime" label="日期时间选择" shrink />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="month" label="月份选择" shrink />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="week" label="星期选择" shrink />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="time" label="时间选择" shrink />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="search" label="搜索框" />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="email" label="邮件地址" />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="password" label="密码" />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="tel" label="电话号码" />
        </Column>
        <Column xs={24} sm={12} md={8}>
          <StateTextInput type="url" label="URL" />
        </Column>
      </Row>
    </ThemeProvider>
  );
}

export default CustomTypeInputDemo;
