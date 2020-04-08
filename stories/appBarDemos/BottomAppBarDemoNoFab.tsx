import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import BottomAppBar from '@sinoui/core/BottomAppBar';
import IconButton from '@sinoui/core/IconButton';
import Dehaze from '@sinoui/icons/Dehaze';
import Favorite from '@sinoui/icons/Favorite';
import Bookmark from '@sinoui/icons/Bookmark';

export default function Demo(props: { insertFab?: boolean; endFab?: boolean }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BottomAppBar
        {...props}
        navigationIcon={
          <IconButton color="#fff">
            <Dehaze />
          </IconButton>
        }
        actionItems={[
          <IconButton color="#fff">
            <Favorite />
          </IconButton>,
          <IconButton color="#fff">
            <Bookmark />
          </IconButton>,
        ]}
      />
    </ThemeProvider>
  );
}
