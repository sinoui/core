import React, { useState } from 'react';
import BaseInput from '@sinoui/core/BaseInput';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdSearch, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import InputAdornment from '@sinoui/core/InputAdornment';

export default {
  title: 'BaseInput',
};

const inputStyle = {
  borderBottom: '1px solid black',
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
      endAdornment={
        <InputAdornment position="end">
          <MdSearch onClick={() => console.log('search')} />
        </InputAdornment>
      }
      placeholder="请输入搜索条件"
    />
  </ThemeProvider>
);

const ChangePasswordDemo = () => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <BaseInput
      type={isPassword ? 'password' : 'text'}
      style={{
        borderBottom: '1px solid currentColor',
      }}
      endAdornment={
        <InputAdornment position="end">
          {isPassword ? (
            <MdVisibilityOff
              onClick={() => setIsPassword(false)}
              onMouseDown={(event) =>
                event.preventDefault()
              } /* 可以阻止输入框失去焦点 */
            />
          ) : (
            <MdVisibility
              onClick={() => setIsPassword(true)}
              onMouseDown={(event) =>
                event.preventDefault()
              } /* 可以阻止输入框失去焦点 */
            />
          )}
        </InputAdornment>
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

export const 自动计算尺寸的输入框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <BaseInput
        multiline
        style={inputStyle}
        placeholder="多行输入框"
        inputProps={{
          rows: 1,
        }}
      />
      <BaseInput style={inputStyle} placeholder="单行输入框" />
    </div>
  </ThemeProvider>
);

export const 前后缀 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
      }}
    >
      <BaseInput
        endAdornment={<InputAdornment position="end">千克</InputAdornment>}
        value="100"
        style={inputStyle}
        align="end"
      />
      <BaseInput
        startAdornment={<InputAdornment position="start">￥</InputAdornment>}
        placeholder="金额"
        style={inputStyle}
        multiline
      />
    </div>
  </ThemeProvider>
);

export const 禁用状态输入框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
      }}
    >
      <BaseInput
        endAdornment={<InputAdornment position="end">千克</InputAdornment>}
        value="100"
        style={inputStyle}
        align="end"
        disabled
      />
      <BaseInput
        startAdornment={<InputAdornment position="start">￥</InputAdornment>}
        placeholder="金额"
        style={inputStyle}
        multiline
        disabled
        inputProps={{
          rows: 10,
        }}
      />
    </div>
  </ThemeProvider>
);
