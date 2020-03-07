/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import BaseButton from '@sinoui/core/BaseButton';

const CustomButton = styled(BaseButton)`
  min-width: 64px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 4px;
  margin: 8px;
`;

const LinkButton = styled(CustomButton)`
  color: currentColor;

  &:hover {
    color: currentColor;
    background-color: ${(props) => props.theme.palette.action.hover};
    text-decoration: none;
  }
`;

export default function BaseButtonDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <CustomButton>文本按钮</CustomButton>
        <CustomButton>
          <span role="img" aria-label="so cool">
            😀 😎 👍 💯
          </span>
        </CustomButton>
        <LinkButton as="a" href="https://www.baidu.com/">
          百度链接
        </LinkButton>
        <LinkButton href="https://github.com/">github官网</LinkButton>
        <CustomButton ripple={false}>禁用涟漪效果</CustomButton>
        <CustomButton ripple={{ color: 'red' }}>自定义涟漪颜色</CustomButton>
      </>
    </ThemeProvider>
  );
}
