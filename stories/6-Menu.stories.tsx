import React, { useState, useRef } from 'react';
import { MenuListItem, MenuNew } from '@sinoui/core/Menu';
import Button from '@sinoui/core/Button';
import StoryLayout from './StoryLayout';

export default {
  title: 'Menu',
};

function SimpleDemo() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StoryLayout>
      <Button ref={buttonRef} onClick={() => setOpen(!open)}>
        {open ? '关闭' : '打开'}
      </Button>
      <MenuNew
        open={open}
        onRequestClose={() => setOpen(false)}
        referenceElement={buttonRef}
      >
        <MenuListItem>选项一</MenuListItem>
        <MenuListItem>选项二</MenuListItem>
        <MenuListItem>选项三</MenuListItem>
      </MenuNew>
    </StoryLayout>
  );
}

export const 渲染Menu列表 = () => <SimpleDemo />;
