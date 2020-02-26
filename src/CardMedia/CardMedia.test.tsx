import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import CardMedia from './CardMedia';

const mediaImgUrl =
  'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg';

it('正确渲染CardHeader', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <CardMedia imageUrl={mediaImgUrl} wide />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
