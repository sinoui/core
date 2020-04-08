import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import BottomAppBar from '@sinoui/core/BottomAppBar';
import { MdDehaze, MdFavorite, MdBookmark } from 'react-icons/md';
import Icon from './Icon';
import Fab from './Fab';

export default function Demo(props: { insertFab?: boolean; endFab?: boolean }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BottomAppBar
        {...props}
        navigationIcon={
          <Icon>
            <MdDehaze />
          </Icon>
        }
        fab={<Fab />}
        actionItems={[
          <Icon>
            <MdFavorite />
          </Icon>,
          <Icon>
            <MdBookmark />
          </Icon>,
        ]}
      />
    </ThemeProvider>
  );
}
