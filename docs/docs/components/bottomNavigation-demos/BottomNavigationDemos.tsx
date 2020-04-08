import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { MdRestore, MdFavorite, MdLocationOn, MdFolder } from 'react-icons/md';
import BottomNavigation from '@sinoui/core/BottomNavigation';
import BottomNavigationAction from '@sinoui/core/BottomNavigationAction';
import Button from '@sinoui/core/Button';

function BottomNavigationDemos() {
  const [show, setShow] = useState(false);

  const onClick = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button onClick={onClick} raised>
        {show ? '显示底部导航栏' : '隐藏底部导航栏'}
      </Button>
      {show && (
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
      )}
    </ThemeProvider>
  );
}

export default BottomNavigationDemos;
