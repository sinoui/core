import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import ListItemSecondaryAction from '@sinoui/core/ListItemSecondaryAction';
import IconButton from '@sinoui/core/IconButton';
import BookmarkBorder from '@sinoui/icons/BookmarkBorder';

describe('快照测试', () => {
  it('主操作区有图标', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ListItemSecondaryAction>
            <BookmarkBorder />
          </ListItemSecondaryAction>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('主操作区有IconButton', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ListItemSecondaryAction>
            <IconButton>
              <BookmarkBorder />
            </IconButton>
          </ListItemSecondaryAction>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
