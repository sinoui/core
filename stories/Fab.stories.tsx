import React, { useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import Fab from '@sinoui/core/Fab';
import StoryLayout from './StoryLayout';

export default {
  title: 'Fab',
};

export const 浮动按钮 = () => (
  <StoryLayout>
    <Fab>
      <MdAdd />
    </Fab>
  </StoryLayout>
);

export const 设置较小显示 = () => (
  <StoryLayout>
    <Fab mini>
      <MdAdd />
    </Fab>
  </StoryLayout>
);

export const 设置不可用状态 = () => (
  <StoryLayout>
    <Fab disabled>
      <MdAdd />
    </Fab>
  </StoryLayout>
);

export const 设置扩展样式 = () => (
  <StoryLayout>
    <p>左侧有图标：</p>
    <Fab extended>
      <MdAdd style={{ fontSize: '24px', marginRight: '12px' }} />
      <span>按钮</span>
    </Fab>
    <p>右侧有图标：</p>
    <Fab extended>
      <span>按钮</span>
      <MdAdd style={{ fontSize: '24px', marginLeft: '12px' }} />
    </Fab>
    <p>只有文本：</p>
    <Fab extended>
      <span>按钮</span>
    </Fab>
  </StoryLayout>
);

export const 不同形状展示 = () => (
  <StoryLayout>
    <Fab style={{ borderRadius: '50% 0' }}>
      <MdAdd />
    </Fab>
    <p />
    <Fab
      mini
      style={{
        borderRadius: '8px',
      }}
    >
      <MdAdd />
    </Fab>
    <p />
    <Fab
      extended
      style={{
        borderRadius: '12px',
      }}
    >
      <MdAdd style={{ fontSize: '24px', marginRight: '12px' }} />
      <span>按钮</span>
    </Fab>
  </StoryLayout>
);

const TabRef = () => {
  const ref = React.createRef();
  useEffect(() => {
    console.log(ref);
  });
  return (
    <Fab ref={ref}>
      <MdAdd />
    </Fab>
  );
};

export const 指向根元素 = () => (
  <StoryLayout>
    <TabRef />
  </StoryLayout>
);
