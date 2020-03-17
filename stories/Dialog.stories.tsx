import React, { useState } from 'react';
import Dialog from '@sinoui/core/Dialog';
import DialogTitle from '@sinoui/core/DialogTitle';
import DialogContent from '@sinoui/core/DialogContent';
import DialogActions from '@sinoui/core/DialogActions';
import Button from '@sinoui/core/Button';
import StoryLayout from './StoryLayout';

export default {
  title: 'Dialog',
};

export const 弹窗 = () => (
  <StoryLayout>
    <Dialog>
      <DialogTitle>标题</DialogTitle>
      <DialogContent>内容</DialogContent>
      <DialogActions>
        <Button>取消</Button>
        <Button>确定</Button>
      </DialogActions>
    </Dialog>
  </StoryLayout>
);

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>点击</Button>
      <Dialog open={open} onBackdropClick={() => console.log(1)}>
        <DialogTitle>标题</DialogTitle>
        <DialogContent>内容</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={() => setOpen(false)}>确定</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const 弹窗2 = () => (
  <StoryLayout>
    <DialogDemo />
  </StoryLayout>
);

export const 不显示遮罩层 = () => (
  <StoryLayout>
    <Dialog backdrop={false}>
      <DialogTitle>标题</DialogTitle>
      <DialogContent>内容</DialogContent>
      <DialogActions>
        <Button>取消</Button>
        <Button>确定</Button>
      </DialogActions>
    </Dialog>
  </StoryLayout>
);

export const 按钮垂直显示 = () => (
  <StoryLayout>
    <Dialog>
      <DialogTitle>标题</DialogTitle>
      <DialogContent>内容</DialogContent>
      <DialogActions column>
        <Button>取消</Button>
        <Button>确定</Button>
      </DialogActions>
    </Dialog>
  </StoryLayout>
);
