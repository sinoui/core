import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Snackbar from '@sinoui/core/Snackbar';
import Button from '@sinoui/core/Button';

export default function BaseDemo({
  message,
  stacked,
  style,
}: {
  message: string;
  stacked?: boolean;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button raised onClick={() => setOpen(true)}>
        显示snackbar
      </Button>
      <Snackbar
        message={message}
        open={open}
        duration={-1}
        action={
          <Button color="error" onClick={() => alert('执行撤销操作')}>
            undo
          </Button>
        }
        stacked={stacked}
        style={style}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
