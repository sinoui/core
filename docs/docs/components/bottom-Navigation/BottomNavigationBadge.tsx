import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import BottomNavigation from '@sinoui/core/BottomNavigation';
import BottomNavigationAction from '@sinoui/core/BottomNavigationAction';
import Badge from '@sinoui/core/Badge';

function BottomNavigationBadge() {
  const [val, setVal] = useState('');

  return (
    <ThemeProvider theme={defaultTheme}>
      <BottomNavigation
        onChange={(_e: React.FormEvent<HTMLDivElement>, value: string) =>
          setVal(value)
        }
        value={val}
        showLabels={false}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={
            <Badge count={8} dot>
              <MdRestore />
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<MdFavorite />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={
            <Badge count={88}>
              <MdLocationOn />
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={
            <Badge count={888}>
              <MdFolder />
            </Badge>
          }
        />
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default BottomNavigationBadge;
