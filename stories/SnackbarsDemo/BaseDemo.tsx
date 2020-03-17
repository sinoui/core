import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Snackbar from '@sinoui/core/Snackbar';
import Button from '@sinoui/core/Button';

export default function BaseDemo({ leading }: { leading?: boolean }) {
  const [open, setOpen] = useState();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button onClick={() => setOpen(true)}>显示snackbar</Button>
      <Snackbar
        message="单行文本消息"
        open={open}
        duration={1000}
        leading={leading}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
