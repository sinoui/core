/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import Modal from '@sinoui/core/ModalNew';
import Paper from '@sinoui/core/Paper';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Grow from '@sinoui/core/Grow';

export default {
  title: 'Modal',
};

function SimpleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: 10000 }}>
      <div style={{ height: 100 }} />
      <button type="button" onClick={() => setOpen(true)}>
        打开模态框
      </button>
      <input
        autoFocus
        type="text"
        onClick={() => setOpen(true)}
        placeholder="点击输入框弹出模态框"
      />

      <Modal open={open} center onClose={() => setOpen(false)}>
        <Grow in={open}>
          <Paper style={{ width: 200, height: 150, padding: 8 }}>
            这是弹出内容
          </Paper>
        </Grow>
      </Modal>
    </div>
  );
}

export const 渲染模态框2 = () => (
  <ThemeProvider theme={defaultTheme}>
    <SimpleDemo />
  </ThemeProvider>
);
