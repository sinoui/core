import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Snackbar from '@sinoui/core/Snackbar';
import Button from '@sinoui/core/Button';
import Fab from '@sinoui/core/Fab';
import { MdAdd } from 'react-icons/md';

export default function BaseDemo({ leading }: { leading?: boolean }) {
  const [open, setOpen] = useState();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button raised onClick={() => setOpen(true)}>
        显示snackbar
      </Button>
      <div style={{ position: 'relative', height: '100px' }}>
        <Snackbar
          message="单行文本消息"
          open={open}
          leading={leading}
          onClose={() => setOpen(false)}
          style={{ position: 'absolute', marginBottom: '72px' }}
        />
        <Fab
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
          }}
        >
          <MdAdd />
        </Fab>
      </div>
    </ThemeProvider>
  );
}
