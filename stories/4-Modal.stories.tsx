import React, { useState } from 'react';
import Modal from '@sinoui/core/Modal';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default {
  title: 'Modal',
};

function SimpleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        打开模态框
      </button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        onBackdropClick={() => setOpen(false)}
      >
        <div onClick={() => setOpen(false)}> 124</div>
      </Modal>
    </>
  );
}

export const 渲染模态框 = () => (
  <ThemeProvider theme={defaultTheme}>
    <SimpleDemo />
  </ThemeProvider>
);
