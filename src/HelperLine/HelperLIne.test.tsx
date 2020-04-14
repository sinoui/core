import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import HelperLine from './HelperLine';

afterEach(cleanup);

it('渲染帮助区域', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HelperLine data-testid="helperline" />
    </ThemeProvider>,
  );

  const helperLine = getByTestId('helperline');

  expect(helperLine).not.toHaveStyleRule('padding-left');
  expect(helperLine).not.toHaveStyleRule('padding-right');
});

it('在填充模式中使用', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HelperLine data-testid="helperline" variant="filled" />
    </ThemeProvider>,
  );

  const helperLine = getByTestId('helperline');

  expect(helperLine).toHaveStyleRule('padding-left', '12px');
  expect(helperLine).toHaveStyleRule('padding-right', '12px');
});

it('在轮廓模式中使用', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HelperLine data-testid="helperline" variant="outlined" />
    </ThemeProvider>,
  );

  const helperLine = getByTestId('helperline');

  expect(helperLine).toHaveStyleRule('padding-left', '12px');
  expect(helperLine).toHaveStyleRule('padding-right', '12px');
});

it('快照测试', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <>
          <HelperLine />
          <HelperLine variant="filled" />
          <HelperLine variant="outlined" />
        </>
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
