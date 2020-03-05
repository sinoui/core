import React, { useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import Fab from '@sinoui/core/Fab';
import styled from 'styled-components';
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

const TabShapedFirst = styled(Fab)`
  border-radius: 50% 0;
  padding: 0;
  width: 56px;
  height: 56px;
  font-size: 24px;
  .sinoui-fab-extended__ripple-layout {
    width: 56px;
    height: 56px;
    border-radius: 50% 0;
  }
  .sinoui-fab-extended__ripple {
    width: 56px;
    height: 56px;
    border-radius: 50% 0;
  }
`;

const TabShapedSecond = styled(Fab)`
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 0;
  .sinoui-fab-extended__ripple-layout {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
  .sinoui-fab-extended__ripple {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
`;

const TabShapedThird = styled(Fab)`
  border-radius: 12px;

  .sinoui-fab-extended__ripple-layout {
    border-radius: 12px;
  }
  .sinoui-fab-extended__ripple {
    border-radius: 12px;
  }
`;

export const 不同形状展示 = () => (
  <StoryLayout>
    <TabShapedFirst extended>
      <MdAdd />
    </TabShapedFirst>
    <p />
    <TabShapedSecond extended>
      <MdAdd />
    </TabShapedSecond>
    <p />
    <TabShapedThird extended>
      <MdAdd style={{ fontSize: '24px', marginRight: '12px' }} />
      <span>按钮</span>
    </TabShapedThird>
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
