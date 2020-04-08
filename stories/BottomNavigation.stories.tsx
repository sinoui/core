import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import BottomNavigation from '@sinoui/core/BottomNavigation';
import BottomNavigationAction from '@sinoui/core/BottomNavigationAction';

export default {
  title: 'BottomNavigation',
};

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomNavigation
      onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
        console.log(value)
      }
      value="favorites"
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<MdRestore />}
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

export const 设置隐藏标签 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomNavigation
      onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
        console.log(value)
      }
      value="favorites"
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<MdRestore />}
        showLabel={false}
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

export const 设置隐藏所有标签 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomNavigation
      onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
        console.log(value)
      }
      value="favorites"
      showLabels={false}
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<MdRestore />}
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

const BottomNavigationWrapper = styled(BottomNavigation)`
  position: static;
`;

export const 指定背景颜色 = () => (
  <ThemeProvider theme={defaultTheme}>
    <BottomNavigationWrapper
      onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
        console.log(value)
      }
      value="favorites"
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<MdRestore />}
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
    </BottomNavigationWrapper>
    <BottomNavigationWrapper
      onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
        console.log(value)
      }
      value="favorites"
      color="primary"
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<MdRestore />}
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
    </BottomNavigationWrapper>
    <BottomNavigationWrapper
      onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
        console.log(value)
      }
      value="favorites"
      color="success"
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<MdRestore />}
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
    </BottomNavigationWrapper>
  </ThemeProvider>
);
