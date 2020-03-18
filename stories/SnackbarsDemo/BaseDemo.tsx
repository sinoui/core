import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Snackbar from '@sinoui/core/Snackbar';
import Button from '@sinoui/core/Button';

export default function BaseDemo({
  message,
  leading,
  style,
}: {
  message: string;
  leading?: boolean;
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
        leading={leading}
        onClose={() => setOpen(false)}
        style={style}
      />
    </ThemeProvider>
  );
}
