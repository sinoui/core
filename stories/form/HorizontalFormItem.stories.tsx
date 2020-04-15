import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import TextInput from '@sinoui/core/TextInput';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import { HorizontalFormItem } from '@sinoui/core/FormItem';
import FormLabel from '@sinoui/core/FormLabel';

export default {
  title: 'HorizontalFormItem',
};

export const 标准模式FormLabel = () => (
  <ThemeProvider theme={defaultTheme}>
    <form>
      <div>
        <FormLabel required layout="standard">
          AAA
        </FormLabel>
      </div>
      <div>
        <FormLabel required layout="standard">
          aaa
        </FormLabel>
      </div>
      <div>
        <FormLabel required layout="standard" colon>
          用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名
        </FormLabel>
      </div>
    </form>
  </ThemeProvider>
);

export const 基础水平布局 = () => (
  <ThemeProvider theme={defaultTheme}>
    <form>
      <HorizontalFormItem label="用户名" helperText="用户名首字母大写" error>
        <TextInput placeholder="请输入用户名" />
      </HorizontalFormItem>

      <HorizontalFormItem label="爱好">
        <CheckboxGroup>
          <Checkbox value="1">复选框1</Checkbox>
          <Checkbox value="2">复选框2</Checkbox>
          <Checkbox value="3">复选框3</Checkbox>
          <Checkbox value="4">复选框4</Checkbox>
        </CheckboxGroup>
      </HorizontalFormItem>

      <HorizontalFormItem label="性别">
        <RadioGroup>
          <Radio value="1">男</Radio>
          <Radio value="2">女</Radio>
        </RadioGroup>
      </HorizontalFormItem>
      <HorizontalFormItem label="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明">
        <TextInput multiline placeholder="说明" />
      </HorizontalFormItem>
    </form>
  </ThemeProvider>
);
