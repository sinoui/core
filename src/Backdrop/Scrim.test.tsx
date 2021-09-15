/**
 * @jest-environment jsdom
 */
import React from 'react';
import { create } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import { cleanup, render } from '@testing-library/react';
import Scrim from './Scrim';

afterEach(cleanup);

describe('快照测试', () => {
  it('展现scrim', () => {
    const tree = create(
      <ThemeProvider theme={defaultTheme}>
        <Scrim />
      </ThemeProvider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置透明度', () => {
    const tree = create(
      <ThemeProvider theme={defaultTheme}>
        <Scrim opacity={0} />
      </ThemeProvider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置z-index', () => {
    const tree = create(
      <ThemeProvider theme={defaultTheme}>
        <Scrim zIndex={0} />
      </ThemeProvider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

it('默认透明度为0.32', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Scrim data-testid="scrim" />
    </ThemeProvider>,
  );

  expect(getByTestId('scrim')).toHaveStyleRule(
    'background-color',
    'rgba(0,0,0,0.32)',
  );
});

it('设置透明度', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Scrim data-testid="scrim" opacity={0.12} />
    </ThemeProvider>,
  );

  expect(getByTestId('scrim')).toHaveStyleRule(
    'background-color',
    'rgba(0,0,0,0.12)',
  );
});

it('默认无z-index', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Scrim data-testid="scrim" />
    </ThemeProvider>,
  );

  expect(getByTestId('scrim')).not.toHaveStyleRule('z-index');
});

it('设置 z-index', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Scrim data-testid="scrim" zIndex={2} />
    </ThemeProvider>,
  );

  expect(getByTestId('scrim')).toHaveStyleRule('z-index', '2');
});
