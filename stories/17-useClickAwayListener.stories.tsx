import React, { useState, useRef } from 'react';
import Button from '@sinoui/core/Button';
import Popper from '@sinoui/core/Popper';
import Paper from '@sinoui/core/Paper';
import useClickAwayListener from '@sinoui/core/useClickAwayListener';
import Body2 from '@sinoui/core/Body2';
import StoryLayout from './StoryLayout';

export default {
  title: 'useClickAwayListener',
};

const ClickAwayListenerDemo = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  useClickAwayListener([buttonRef, popperRef], () => {
    setOpen(false);
  });

  return (
    <div>
      <Button ref={buttonRef} onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <Popper open={open} referenceElement={buttonRef} ref={popperRef}>
        <Paper>
          <Body2>
            这是弹出内容，点击弹出内容和按钮之外的区域，隐藏弹出层。
          </Body2>
          <Button>这是弹窗层上的按钮</Button>
        </Paper>
      </Popper>
    </div>
  );
};

export const 点击元素之外的元素 = () => (
  <StoryLayout>
    <ClickAwayListenerDemo />
  </StoryLayout>
);
