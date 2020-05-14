import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import NavigationRail from '@sinoui/core/NavigationRail';
import NavigationRailAction from '@sinoui/core/NavigationRailAction';
import Fab from '@sinoui/core/Fab';
import Add from '@sinoui/icons/Add';

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

export default NavigationRailDemo;
