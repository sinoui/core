import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import BottomAppBar from '@sinoui/core/BottomAppBar';
import Icon from './Icon';
import { MdDehaze, MdFavorite, MdBookmark } from 'react-icons/md';

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
