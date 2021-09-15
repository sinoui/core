/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import CardMedia from './CardMedia';

const mediaImgUrl =
  'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg';

describe('CardMedia组件单元测试', () => {
  afterEach(cleanup);

  it('CardMedia设置wide属性', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <CardMedia imageUrl={mediaImgUrl} wide />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('sinoui-card__media--16-9');
  });

  it('CardMedia设置square属性', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <CardMedia imageUrl={mediaImgUrl} square />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('sinoui-card__media--square');
  });
});

describe('快照测试', () => {
  it('CardMedia设置wide属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardMedia imageUrl={mediaImgUrl} wide />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('CardMedia设置square属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardMedia imageUrl={mediaImgUrl} square />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
