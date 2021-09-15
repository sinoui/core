/**
 * @jest-environment jsdom
 */
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

it('快照测试', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <>
          <HelperLine />
        </>
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
