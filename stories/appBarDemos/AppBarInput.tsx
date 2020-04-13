import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import AppBar from '@sinoui/core/AppBar';
import IconButton from '@sinoui/core/IconButton';
import Dehaze from '@sinoui/icons/Dehaze';
import Favorite from '@sinoui/icons/Favorite';
import Bookmark from '@sinoui/icons/Bookmark';

export default function Demo(props: {
  prominent?: boolean;
  dense?: boolean;
  fixed?: boolean;
  short?: boolean;
}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar
        {...props}
        title={
          <div style={{ display: 'flex' }}>
            <div>标题</div>
            <input placeholder="请输入" style={{ height: '32px' }} />
          </div>
        }
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
