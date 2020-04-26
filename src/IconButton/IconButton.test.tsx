import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Favorite from '@sinoui/icons/Favorite';
import '@testing-library/jest-dom';
import IconButton from './IconButton';

it('正确渲染IconButton', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <IconButton>
        <svg height="24" viewBox="0 0 24 24" width="24">
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </IconButton>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染不可用的图标按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <IconButton disabled>
        <svg height="24" viewBox="0 0 24 24" width="24">
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </IconButton>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染color为primary的图标按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <IconButton color="primary">
        <svg height="24" viewBox="0 0 24 24" width="24">
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </IconButton>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染密集模式下的图标按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <IconButton color="primary" dense>
        <Favorite />
      </IconButton>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});
