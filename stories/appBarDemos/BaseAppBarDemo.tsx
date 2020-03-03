import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import AppBar from '@sinoui/core/AppBar';
import AppBarTitle from '@sinoui/core/AppBarTitle';
import NavigationIcon from '@sinoui/core/NavigationIcon';
import AppBarActions from '@sinoui/core/AppBarActions';
import Icon from './Icon';
import { MdDehaze, MdFavorite, MdBookmark } from 'react-icons/md';

export default function Demo(props: {
  prominent?: boolean;
  dense?: boolean;
  fixed?: boolean;
  short?: boolean;
}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar {...props}>
        <NavigationIcon>
          <Icon>
            <MdDehaze />
          </Icon>
        </NavigationIcon>
        <AppBarTitle>标题</AppBarTitle>
        <AppBarActions>
          <Icon>
            <MdFavorite />
          </Icon>
          <Icon>
            <MdBookmark />
          </Icon>
        </AppBarActions>
      </AppBar>
    </ThemeProvider>
  );
}
