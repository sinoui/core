import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import NavigationRail from '@sinoui/core/NavigationRail';
import NavigationRailAction from '@sinoui/core/NavigationRailAction';
import Badge from '@sinoui/core/Badge';
import Fab from '@sinoui/core/Fab';
import Add from '@sinoui/icons/Add';

export default {
  title: 'NavigationRail',
};

const Div = styled.div`
  position: relative;
  height: 660px;
`;

const NavigationRailWrapper = styled(NavigationRail)<{
  align?: 'start' | 'center' | 'end';
}>`
  padding-top: ${({ align }) => align !== 'center' && '72px'};
`;

function NavigationRailDemo(props: any) {
  const [val, setVal] = useState('');

  const { showLabels, align } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Div>
        <NavigationRailWrapper
          onChange={(_e: React.FormEvent<HTMLDivElement>, value: string) =>
            setVal(value)
          }
          value={val}
          showLabels={showLabels}
          align={align}
        >
          <Fab>
            <Add />
          </Fab>
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

export const 布局显示 = () => (
  <>
    <p style={{ margin: '10px 0px' }}>居中显示：</p>
    <NavigationRailDemo align="center" />
    <p style={{ margin: '10px 0px' }}>从下向上显示：</p>
    <NavigationRailDemo align="end" />
  </>
);
