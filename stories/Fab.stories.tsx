import React from 'react';
import { MdAdd } from 'react-icons/md';
import Fab from '@sinoui/core/Fab';
import styled from 'styled-components';
import SvgIcon from '@sinoui/core/SvgIcon';
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
      <SvgIcon as={MdAdd} />
      按钮
    </Fab>
    <p>右侧有图标：</p>
    <Fab extended>
      按钮
      <SvgIcon as={MdAdd} />
    </Fab>
    <p>只有文本：</p>
    <Fab extended>按钮</Fab>
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
      <SvgIcon as={MdAdd} />
      按钮
    </TabShapedThird>
  </StoryLayout>
);

export const 指定不同颜色 = () => (
  <StoryLayout>
    <p>
      color=primary:
      <Fab color="primary">
        <MdAdd />
      </Fab>
    </p>
    <p>
      color=secondary:
      <Fab color="secondary">
        <MdAdd />
      </Fab>
    </p>
    <p>
      color=error:
      <Fab color="error">
        <MdAdd />
      </Fab>
    </p>
    <p>
      color=warning:
      <Fab color="warning">
        <MdAdd />
      </Fab>
    </p>
    <p>
      color=info:
      <Fab color="info">
        <MdAdd />
      </Fab>
    </p>
    <p>
      color=success:
      <Fab color="success">
        <MdAdd />
      </Fab>
    </p>
    <p>
      color=actionActive:
      <Fab color="actionActive">
        <MdAdd />
      </Fab>
    </p>
    <p>
      color=actionDisabled:
      <Fab color="actionDisabled">
        <MdAdd />
      </Fab>
    </p>
  </StoryLayout>
);
