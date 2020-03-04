import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import BottomAppBar from '@sinoui/core/BottomAppBar';
import NavigationIcon from '@sinoui/core/NavigationIcon';
import AppBarActions from '@sinoui/core/AppBarActions';
import Icon from './Icon';
import { MdDehaze, MdFavorite, MdBookmark } from 'react-icons/md';

export default function Demo(props: { insertFab?: boolean; endFab?: boolean }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BottomAppBar {...props}>
        <NavigationIcon>
          <Icon>
            <MdDehaze />
          </Icon>
        </NavigationIcon>
        <AppBarActions>
          <Icon>
            <MdFavorite />
          </Icon>
          <Icon>
            <MdBookmark />
          </Icon>
        </AppBarActions>
      </BottomAppBar>
    </ThemeProvider>
  );
}
