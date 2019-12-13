import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import InputLabel from '../InputLabel';

it('渲染密集模式下的Label', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <InputLabel dense variant="filled">
          用户名
        </InputLabel>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染上浮之后的Label', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <InputLabel dense variant="filled" shrink>
          用户名
        </InputLabel>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
