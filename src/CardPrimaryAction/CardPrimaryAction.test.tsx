import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import CardPrimaryAction from './CardPrimaryAction';

it('正确渲染CardPrimaryAction', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <CardPrimaryAction>文本</CardPrimaryAction>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
