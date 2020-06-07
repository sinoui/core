import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import NavigationRail from '@sinoui/core/NavigationRail';
import NavigationRailAction from '@sinoui/core/NavigationRailAction';
import Badge from '@sinoui/core/Badge';

function NavigationRailBadge() {
  const [val, setVal] = useState('');

  return (
    <ThemeProvider theme={defaultTheme}>
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
    </ThemeProvider>
  );
}

export default NavigationRailBadge;
