import React from 'react';
import renderer from 'react-test-renderer';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import BottomNavigation from '@sinoui/core/BottomNavigation';
import BottomNavigationAction from '@sinoui/core/BottomNavigationAction';

/**
 * BottomNavigation组件 快照测试
 */
it('基本使用', () => {
  const tree = renderer.create(
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
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('设置隐藏标签名称', () => {
  const tree = renderer.create(
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
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('设置隐藏所有标签名称', () => {
  const tree = renderer.create(
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
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

const BottomNavigationWrapper = styled(BottomNavigation)`
  position: static;
`;

it('指定背景颜色', () => {
  const tree = renderer.create(
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
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});
