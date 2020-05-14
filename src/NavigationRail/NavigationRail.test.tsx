import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import NavigationRail from '@sinoui/core/NavigationRail';
import NavigationRailAction from '@sinoui/core/NavigationRailAction';
import Badge from '@sinoui/core/Badge';

/**
 * NavigationRail组件 测试
 */

describe('NavigationRail组件 单元测试', () => {
  afterEach(cleanup);

  it('不显示所有标签', () => {
    const { container, getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
            console.log(value)
          }
          value="favorites"
          showLabels={false}
        >
          <NavigationRailAction
            label="Recents"
            value="recents"
            icon={<MdRestore />}
            data-testid="NavigationRail"
          />
          <NavigationRailAction
            label="Favorites"
            value="favorites"
            icon={<MdFavorite />}
          />
          <NavigationRailAction
            label="Nearby"
            value="nearby"
            icon={<MdLocationOn />}
          />
        </NavigationRail>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-navigation-rail--selected');
    expect(text && text.lastChild).toHaveTextContent('Favorites');

    const val = getByTestId('NavigationRail');
    expect(val && val.lastChild).toHaveTextContent('');
  });

  it('测试是否选中', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
            console.log(value)
          }
          value="favorites"
          data-testid="NavigationRail"
        >
          <NavigationRailAction
            label="Recents"
            value="recents"
            icon={<MdRestore />}
          />
          <NavigationRailAction
            label="Favorites"
            value="favorites"
            icon={<MdFavorite />}
          />
        </NavigationRail>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-navigation-rail--selected');
    expect(text && text.lastChild).toHaveTextContent('Favorites');
  });
});

describe('NavigationRail组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer.create(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
            console.log(value)
          }
          value="favorites"
        >
          <NavigationRailAction
            label="Recents"
            value="recents"
            icon={<MdRestore />}
          />
          <NavigationRailAction
            label="Favorites"
            value="favorites"
            icon={<MdFavorite />}
          />
          <NavigationRailAction
            label="Nearby"
            value="nearby"
            icon={<MdLocationOn />}
          />
          <NavigationRailAction
            label="Folder"
            value="folder"
            icon={<MdFolder />}
          />
        </NavigationRail>
      </ThemeProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('设置隐藏所有标签名称', () => {
    const tree = renderer.create(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
            console.log(value)
          }
          value="favorites"
          showLabels={false}
        >
          <NavigationRailAction
            label="Recents"
            value="recents"
            icon={<MdRestore />}
          />
          <NavigationRailAction
            label="Favorites"
            value="favorites"
            icon={<MdFavorite />}
          />
          <NavigationRailAction
            label="Nearby"
            value="nearby"
            icon={<MdLocationOn />}
          />
          <NavigationRailAction
            label="Folder"
            value="folder"
            icon={<MdFolder />}
          />
        </NavigationRail>
      </ThemeProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('结合Badge组件使用', () => {
    const tree = renderer.create(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
            console.log(value)
          }
          value="favorites"
        >
          <NavigationRailAction
            label="Recents"
            value="recents"
            icon={
              <Badge count={8} dot>
                <MdRestore />
              </Badge>
            }
          />
          <NavigationRailAction
            label="Favorites"
            value="favorites"
            icon={<MdFavorite />}
          />
          <NavigationRailAction
            label="Nearby"
            value="nearby"
            icon={
              <Badge count={88}>
                <MdLocationOn />
              </Badge>
            }
          />
          <NavigationRailAction
            label="Folder"
            value="folder"
            icon={
              <Badge count={888}>
                <MdFolder />
              </Badge>
            }
          />
        </NavigationRail>
      </ThemeProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('布局显示', () => {
    const tree = renderer.create(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
            console.log(value)
          }
          value="favorites"
          align="center"
        >
          <NavigationRailAction
            label="Recents"
            value="recents"
            icon={<MdRestore />}
          />
          <NavigationRailAction
            label="Favorites"
            value="favorites"
            icon={<MdFavorite />}
          />
          <NavigationRailAction
            label="Nearby"
            value="nearby"
            icon={<MdLocationOn />}
          />
          <NavigationRailAction
            label="Folder"
            value="folder"
            icon={<MdFolder />}
          />
        </NavigationRail>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value) =>
            console.log(value)
          }
          value="favorites"
          align="end"
        >
          <NavigationRailAction
            label="Recents"
            value="recents"
            icon={<MdRestore />}
          />
          <NavigationRailAction
            label="Favorites"
            value="favorites"
            icon={<MdFavorite />}
          />
          <NavigationRailAction
            label="Nearby"
            value="nearby"
            icon={<MdLocationOn />}
          />
          <NavigationRailAction
            label="Folder"
            value="folder"
            icon={<MdFolder />}
          />
        </NavigationRail>
      </ThemeProvider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
