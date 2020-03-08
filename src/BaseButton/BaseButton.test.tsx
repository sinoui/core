import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import BaseButton from './BaseButton';

it('正确渲染文本按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <BaseButton>文本按钮</BaseButton>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('正确渲染链接按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <div>
        <BaseButton as="a" href="https://www.baidu.com/">
          百度链接
        </BaseButton>
        <BaseButton href="https://github.com/">github官网</BaseButton>
      </div>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('禁用涟漪', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <BaseButton ripple={false}>禁用涟漪效果</BaseButton>
        <BaseButton disabled>按钮不可用</BaseButton>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('自定义涟漪颜色', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <BaseButton ripple={{ color: 'red' }}>自定义涟漪效果</BaseButton>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});
