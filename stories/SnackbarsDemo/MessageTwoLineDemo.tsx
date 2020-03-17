import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Snackbar from '@sinoui/core/Snackbar';
import Button from '@sinoui/core/Button';

export default function Demo({ stacked }: { stacked?: boolean }) {
  const [open, setOpen] = useState();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button onClick={() => setOpen(true)}>显示snackbar</Button>
      <Snackbar
        message="多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息多行文本消息"
        open={open}
        duration={-1}
        stacked={stacked}
        action={<Button color="error">undo</Button>}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
