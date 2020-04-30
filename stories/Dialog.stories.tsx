import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@sinoui/core/Dialog';
import DialogTitle from '@sinoui/core/DialogTitle';
import DialogContent from '@sinoui/core/DialogContent';
import DialogActions from '@sinoui/core/DialogActions';
import Button from '@sinoui/core/Button';
import StoryLayout from './StoryLayout';

export default {
  title: 'Dialog',
};

function DialogDemo(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>CLICK</Button>
      <Dialog open={open} {...props}>
        <DialogTitle>Use Google location service</DialogTitle>
        <DialogContent>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>DISAGREE</Button>
          <Button onClick={() => setOpen(false)}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const DialogWrapper = styled(Dialog)`
  width: 610px;
  height: 400px;
`;

function DialogShow(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>CLICK</Button>
      <DialogWrapper open={open} {...props} autoWidth>
        <DialogTitle>Use Google location service</DialogTitle>
        <DialogContent style={{ width: '560px' }}>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>DISAGREE</Button>
          <Button onClick={() => setOpen(false)}>AGREE</Button>
        </DialogActions>
      </DialogWrapper>
    </>
  );
}

export const 基本使用 = () => (
  <StoryLayout>
    <DialogDemo />
  </StoryLayout>
);

export const 不显示遮罩层 = () => (
  <StoryLayout>
    <DialogDemo backdrop={false} />
  </StoryLayout>
);

export const 按钮垂直显示 = () => (
  <StoryLayout>
    <Dialog open>
      <DialogTitle>Use Google location service</DialogTitle>
      <DialogContent>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </DialogContent>
      <DialogActions column>
        <Button>DISAGREE</Button>
        <Button>AGREE</Button>
      </DialogActions>
    </Dialog>
  </StoryLayout>
);

function DialogCloseDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>CLICK</Button>
      <Dialog open={open} showCloseIcon onRequestClose={() => setOpen(false)}>
        <DialogTitle>Use Google location service</DialogTitle>
        <DialogContent>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>DISAGREE</Button>
          <Button onClick={() => setOpen(false)}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const 显示关闭图标 = () => (
  <StoryLayout>
    <DialogCloseDemo />
  </StoryLayout>
);

export const 设置弹窗不可以拖拽 = () => (
  <StoryLayout>
    <DialogDemo draggable={false} />
  </StoryLayout>
);

function DialogBackDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>CLICK</Button>
      <Dialog
        open={open}
        onBackdropClick={() => setOpen(false)}
        backdropClick
        absolute
      >
        <DialogTitle>Use Google location service</DialogTitle>
        <DialogContent>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>DISAGREE</Button>
          <Button onClick={() => setOpen(false)}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const 设置点击遮罩层的回调函数 = () => (
  <StoryLayout>
    <DialogBackDemo />
  </StoryLayout>
);

export const 设置全屏显示 = () => (
  <StoryLayout>
    <DialogDemo fullScreen />
  </StoryLayout>
);

export const 设置最大宽度显示 = () => (
  <StoryLayout>
    <DialogDemo fullWidth />
  </StoryLayout>
);

export const 设置宽度自适应 = () => (
  <StoryLayout>
    <DialogDemo autoWidth />
  </StoryLayout>
);

export const 设置自定义宽度 = () => (
  <StoryLayout>
    <DialogShow />
  </StoryLayout>
);
