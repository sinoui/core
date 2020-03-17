import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Snackbar from '@sinoui/core/Snackbar';
import Button from '@sinoui/core/Button';

export default function BaseDemo() {
  const [open, setOpen] = useState();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button onClick={() => setOpen(true)}>显示snackbar</Button>
      <Snackbar
        message="单行文本消息"
        open={open}
        duration={-1}
        action={
          <Button color="error" onClick={() => alert('执行撤销操作')}>
            undo
          </Button>
        }
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
