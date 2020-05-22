import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import NavigationRail from '@sinoui/core/NavigationRail';
import NavigationRailAction from '@sinoui/core/NavigationRailAction';
import Badge from '@sinoui/core/Badge';
import Fab from '@sinoui/core/Fab';
import Add from '@sinoui/icons/Add';
import Paper from '@sinoui/core/Paper';
import { opacify } from 'polished';

export default {
  title: 'NavigationRail',
};

const Div = styled.div`
  position: relative;
  height: 100vh;
`;

function NavigationRailDemo(props: any) {
  const [val, setVal] = useState('');

  const { showLabels, align } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Div>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value: string) =>
            setVal(value)
          }
          value={val}
          showLabels={showLabels}
          align={align}
          fab={
            <Fab>
              <Add />
            </Fab>
          }
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
      </Div>
    </ThemeProvider>
  );
}

function NavigationRailBadge() {
  const [val, setVal] = useState('recents');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Div>
        <NavigationRail
          onChange={(_e: React.FormEvent<HTMLDivElement>, value: string) =>
            setVal(value)
          }
          value={val}
          showLabels={false}
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
      </Div>
    </ThemeProvider>
  );
}

export const 基本使用 = () => <NavigationRailDemo />;

export const 设置隐藏所有标签 = () => <NavigationRailDemo showLabels={false} />;

export const 结合Badge组件使用 = () => <NavigationRailBadge />;

export const 布局居中显示 = () => (
  <>
    <p style={{ margin: '10px 0px' }}>居中显示：</p>
    <NavigationRailDemo align="center" />
  </>
);

export const 底部对齐显示 = () => (
  <>
    <p style={{ margin: '10px 0px' }}>底部对齐显示：</p>
    <NavigationRailDemo align="end" />
  </>
);

function NavigationRailScreen() {
  const [val, setVal] = useState('');

  const Wrapper = styled.div`
    background: ${(props) => props.theme.palette.primary.main};
    padding: 40px 10px 40px 72px;
    height: 100vh;
    position: relative;
  `;

  const NavigationRailWrapper = styled(NavigationRail)`
    position: absolute;
    left: 0px;
    top: 40px;
    background: ${(props) => props.theme.palette.primary.main};
    border: 0;
    height: auto;

    > .sinoui-navigation-rail {
      color: ${(props) => opacify(-0.24, props.theme.palette.common.white)};
    }

    > .sinoui-navigation-rail--selected {
      color: ${(props) => props.theme.palette.common.white};
    }
  `;

  const PaperWrapper = styled(Paper)`
    border-radius: 10px;
    height: 100%;
    padding: 0px 10px;
  `;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>
        <NavigationRailWrapper
          onChange={(_e: React.FormEvent<HTMLDivElement>, value: string) =>
            setVal(value)
          }
          value={val}
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
        </NavigationRailWrapper>
        <PaperWrapper elevation={4}>沉浸式示例</PaperWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export const 沉浸式示例 = () => <NavigationRailScreen />;
