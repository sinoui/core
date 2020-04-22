import React, { useState, useRef } from 'react';
import Popover from '@sinoui/core/Popover';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'Popover',
};

function SimpleDemo() {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLElement | null>(null);

  const handleClick = (event: any) => {
    setOpen(true);
    anchorEl.current = event.currentTarget;
  };

  const onRequestClose = () => {
    setOpen(false);
    anchorEl.current = null;
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        弹出Popover
      </button>
      <Popover
        open={open}
        anchorEl={anchorEl.current as any}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            padding: 16,
          },
        }}
        onRequestClose={onRequestClose}
      >
        <div style={{ width: 140, height: 20 }}>这是弹出的内容</div>
      </Popover>
    </>
  );
}

export const 渲染Popover = () => (
  <ThemeProvider theme={defaultTheme}>
    <SimpleDemo />
  </ThemeProvider>
);
