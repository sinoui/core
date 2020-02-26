import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import Card from '.';

it('正确渲染Card', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <Card>文本</Card>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
