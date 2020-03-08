import React, { useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import AppBar from '@sinoui/core/AppBar';
import Icon from './Icon';
import { MdDehaze, MdFavorite, MdBookmark } from 'react-icons/md';

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
      <div>
        <AppBar
          {...props}
          targetScroll={targetScrollRef}
          title="标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题"
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
        <div
          ref={targetScrollRef}
          style={{ height: '200px', overflowY: 'auto' }}
        >
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
