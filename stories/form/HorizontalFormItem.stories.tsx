import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import FormLabel from '@sinoui/core/FormLabel';
import TextInput from '@sinoui/core/TextInput';
import { HorizontalFormItem } from '@sinoui/core/FormItem';

export default {
  title: 'HorizontalFormItem',
};

export const 简单FormLabel = () => (
  <ThemeProvider theme={defaultTheme}>
    <form>
      <HorizontalFormItem label="用户名" helperText="用户名首字母大写" error>
        <TextInput placeholder="请输入用户名" />
      </HorizontalFormItem>

      <HorizontalFormItem
        label={
          <FormLabel layout="standard" focused>
            用户名
          </FormLabel>
        }
        error
      >
        <TextInput placeholder="请输入用户名" />
      </HorizontalFormItem>

      <HorizontalFormItem
        label={
          <FormLabel layout="standard" colon required>
            用户名
          </FormLabel>
        }
      >
        <TextInput placeholder="请输入用户名" />
      </HorizontalFormItem>

      <HorizontalFormItem
        label={
          <FormLabel layout="standard" colon>
            用户名
          </FormLabel>
        }
      >
        <TextInput placeholder="请输入用户名" />
      </HorizontalFormItem>
      <HorizontalFormItem
        label={
          <FormLabel layout="standard" colon disabled>
            用户名
          </FormLabel>
        }
      >
        <TextInput placeholder="请输入用户名" disabled />
      </HorizontalFormItem>
    </form>
  </ThemeProvider>
);
