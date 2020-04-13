import React, { useRef } from 'react';
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
  shortCollapsed?: boolean;
}) {
  const targetScrollRef = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider theme={defaultTheme}>
      <div ref={targetScrollRef} style={{ height: '200px', overflowY: 'auto' }}>
        <AppBar
          {...props}
          targetScroll={targetScrollRef}
          title="标题标题标题标题标题"
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
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
            (index: number) => (
              <h1 style={{ margin: '0 0 10px 0' }}>item{index}</h1>
            ),
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
