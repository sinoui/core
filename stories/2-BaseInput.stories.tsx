import React, { useState } from 'react';
import BaseInput from '@sinoui/core/BaseInput';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdSearch, MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default {
  title: 'BaseInput',
};

export const 展示输入框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseInput
      placeholder="请输入姓名"
      style={{
        borderBottom: '1px solid currentColor',
      }}
    />
  </ThemeProvider>
);

export const 自动获取焦点 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseInput
      placeholder="请输入姓名"
      autoFocus
      style={{
        borderBottom: '1px solid currentColor',
      }}
      onFocus={() => console.log('focused')}
    />
  </ThemeProvider>
);

export const 搜索框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BaseInput
      style={{
        border: '1px solid currentColor',
        borderRadius: 16,
        padding: '0 16px',
      }}
      endComponent={<MdSearch onClick={() => console.log('search')} />}
      placeholder="请输入搜索条件"
    />
  </ThemeProvider>
);

const ChangePasswordDemo = () => {
  const [isPassword, setIsPassword] = useState(false);

  return (
    <BaseInput
      type={isPassword ? 'password' : 'text'}
      style={{
        borderBottom: '1px solid currentColor',
      }}
      endComponent={
        isPassword ? (
          <MdVisibility
            onClick={() => setIsPassword(false)}
            onMouseDown={(event) =>
              event.preventDefault()
            } /* 可以阻止输入框失去焦点 */
          />
        ) : (
          <MdVisibilityOff
            onClick={() => setIsPassword(true)}
            onMouseDown={(event) =>
              event.preventDefault()
            } /* 可以阻止输入框失去焦点 */
          />
        )
      }
      placeholder="请输入密码"
    />
  );
};

export const 切换密码 = () => (
  <ThemeProvider theme={defaultTheme}>
    <ChangePasswordDemo />
  </ThemeProvider>
);
