/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import Modal from '@sinoui/core/Modal';
import Paper from '@sinoui/core/Paper';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Grow from '@sinoui/core/Grow';
import Button from '@sinoui/core/Button';
import TextInput from '@sinoui/core/TextInput';
import AppBar from '@sinoui/core/AppBar';
import Save from '@sinoui/icons/Save';
import IconButton from '@sinoui/core/IconButton';

export default {
  title: 'Modal',
};

function SimpleDemo() {
  const [open, setOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <div style={{ height: 10000 }}>
      <AppBar
        title="模态框"
        actionItems={
          <IconButton color="white">
            <Save />
          </IconButton>
        }
        fixed
      />
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
          <Paper style={{ width: 300, height: 200, padding: 8 }}>
            <div>这是弹出内容</div>
            <Button onClick={() => setInnerOpen(true)}>打开</Button>
            <Modal open={innerOpen} center onClose={() => setInnerOpen(false)}>
              <Paper style={{ width: 200, height: 150, padding: 8 }}>
                这是内层弹出内容
                <TextInput autoFocus />
              </Paper>
            </Modal>
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
