import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import React from 'react';
import 'jest-styled-components';
import HelperText from './HelperText';

afterEach(cleanup);

it('渲染帮助性文本', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HelperText data-testid="helperText">帮助性文本</HelperText>
    </ThemeProvider>,
  );

  const helperText = getByTestId('helperText');

  expect(helperText).toHaveStyleRule('font-size', '0.75rem');
  expect(helperText).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.secondary.replace(/ +/g, ''),
  );
});

it('渲染验证错误信息', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HelperText data-testid="helperText" error>
        必填
      </HelperText>
    </ThemeProvider>,
  );

  const helperText = getByTestId('helperText');

  expect(helperText).toHaveStyleRule(
    'color',
    defaultTheme.palette.error.main.replace(/ +/g, ''),
  );
});

it('不可用情况', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HelperText data-testid="helperText" disabled>
        必填
      </HelperText>
    </ThemeProvider>,
  );

  const helperText = getByTestId('helperText');

  expect(helperText).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.disabled.replace(/ +/g, ''),
  );
});

it('使用不同的颜色', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HelperText data-testid="helperText" color="primary">
        必填
      </HelperText>
    </ThemeProvider>,
  );

  const helperText = getByTestId('helperText');

  expect(helperText).toHaveStyleRule(
    'color',
    defaultTheme.palette.primary.main.replace(/ +/g, ''),
  );
});

it('快照测试', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <>
          <HelperText>帮助性文本</HelperText>
          <HelperText error>错误信息</HelperText>
          <HelperText disabled>不可用</HelperText>
          <HelperText color="primary">指定其他颜色</HelperText>
        </>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
