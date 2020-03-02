import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

it('正确渲染三种形式按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Button>文本按钮</Button>
        <Button outlined>轮廓按钮</Button>
        <Button raised>容器按钮</Button>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下的三种形式按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Button disabled>文本按钮</Button>
        <Button disabled outlined>
          轮廓按钮
        </Button>
        <Button disabled raised>
          容器按钮
        </Button>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});
