import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import NavigationRail from '@sinoui/core/NavigationRail';
import NavigationRailAction from '@sinoui/core/NavigationRailAction';
import { opacify } from 'polished';
import Paper from '@sinoui/core/Paper';

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

function NavigationRailScreen() {
  const [val, setVal] = useState('');

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

export default NavigationRailScreen;
