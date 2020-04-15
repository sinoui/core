import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import FormLabel from '@sinoui/core/FormLabel';
import TextInput from '@sinoui/core/TextInput';
import HorizontalFormItem from './HorizontalFormItem';

afterEach(cleanup);

it('表单项水平布局', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <form>
        <HorizontalFormItem label="用户名">
          <TextInput placeholder="请输入用户名" />
        </HorizontalFormItem>
      </form>
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-helper-line')?.children.length,
  ).toEqual(0);
});

it('表单项水平布局有帮助文本', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <form>
        <HorizontalFormItem label="用户名" helperText="用户名首字母大写">
          <TextInput placeholder="请输入用户名" />
        </HorizontalFormItem>
      </form>
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-helper-line')?.children.length,
  ).toEqual(1);
});

it('快照测试', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <>
          <form>
            <HorizontalFormItem
              label="用户名"
              helperText="用户名首字母大写"
              error
            >
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
        </>
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
