import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import IconButton from '@sinoui/core/IconButton';
import BookmarkBorder from '@sinoui/icons/BookmarkBorder';
import Avatar from '@sinoui/core/Avatar';

describe('快照测试', () => {
  it('主操作区有图标', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ListItemPrimaryAction>
            <BookmarkBorder />
          </ListItemPrimaryAction>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('主操作区有IconButton', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ListItemPrimaryAction>
            <IconButton>
              <BookmarkBorder />
            </IconButton>
          </ListItemPrimaryAction>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('主操作区有头像', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ListItemPrimaryAction>
            <Avatar>M</Avatar>
          </ListItemPrimaryAction>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
