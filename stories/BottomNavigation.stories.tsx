import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import BottomNavigation from '@sinoui/core/BottomNavigation';
import BottomNavigationAction from '@sinoui/core/BottomNavigationAction';

export default {
  title: 'BottomNavigation',
};

function BottomNavigationDemo(props: any) {
  const [val, setVal] = useState('');

  const { showLabel, showLabels, color } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <BottomNavigation
        onChange={(_e: React.FormEvent<HTMLDivElement>, value: string) =>
          setVal(value)
        }
        value={val}
        showLabels={showLabels}
        color={color}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<MdRestore />}
          showLabel={showLabel}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<MdFavorite />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<MdLocationOn />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<MdFolder />}
        />
      </BottomNavigation>
    </ThemeProvider>
  );
}

export const 基本使用 = () => <BottomNavigationDemo />;

export const 设置隐藏标签 = () => <BottomNavigationDemo showLabel={false} />;

export const 设置隐藏所有标签 = () => (
  <BottomNavigationDemo showLabels={false} />
);

export const 指定背景颜色 = () => (
  <>
    <BottomNavigationDemo />
    <BottomNavigationDemo color="primary" />
    <BottomNavigationDemo color="secondary" />
    <BottomNavigationDemo color="success" />
    <BottomNavigationDemo color="info" />
  </>
);
