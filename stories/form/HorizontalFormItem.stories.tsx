import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import FormLabel from '@sinoui/core/FormLabel';
import TextInput from '@sinoui/core/TextInput';

export default {
  title: 'HorizontalFormItem',
};

const FormItem = styled.div`
  display: flex;
`;
export const 简单FormLabel = () => (
  <ThemeProvider theme={defaultTheme}>
    <form>
      <FormItem>
        <FormLabel layout="standard">用户名</FormLabel>
        <TextInput placeholder="请输入用户名" />
      </FormItem>
      <FormItem>
        <FormLabel layout="standard" focused>
          用户名
        </FormLabel>
        <TextInput placeholder="请输入用户名" />
      </FormItem>
      <FormItem>
        <FormLabel layout="standard" colon required>
          用户名
        </FormLabel>
        <TextInput placeholder="请输入用户名" />
      </FormItem>
      <FormItem>
        <FormLabel layout="standard" colon>
          用户名
        </FormLabel>
        <TextInput placeholder="请输入用户名" />
      </FormItem>
      <FormItem>
        <FormLabel layout="standard" colon required disabled>
          用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名
        </FormLabel>
        <TextInput placeholder="请输入用户名" disabled />
      </FormItem>
    </form>
  </ThemeProvider>
);
