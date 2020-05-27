import React from 'react';
import Tooltip from '@sinoui/core/Tooltip';
import Button from '@sinoui/core/Button';
import { Row, Column } from '@sinoui/core/Grid';
import Fade from '@sinoui/core/Fade';
import StoryLayout from './StoryLayout';

export default {
  title: 'Tooltip',
};

const Demo = ({ arrow }: { arrow?: boolean }) => {
  return (
    <StoryLayout>
      <Row>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" placement="right" arrow={arrow}>
            <Button raised>右弹出</Button>
          </Tooltip>
        </Column>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" placement="top" arrow={arrow}>
            <Button raised>下弹出</Button>
          </Tooltip>
        </Column>
      </Row>
    </StoryLayout>
  );
};

export const baseDemo = () => <Demo />;

export const 带箭头 = () => <Demo arrow />;

const Demo1 = () => {
  return (
    <StoryLayout>
      <Row>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" trigger="hover">
            <Button raised>hover</Button>
          </Tooltip>
        </Column>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" trigger="focus">
            <input />
          </Tooltip>
        </Column>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" trigger="click">
            <Button raised>click</Button>
          </Tooltip>
        </Column>
      </Row>
    </StoryLayout>
  );
};

export const 触发事件 = () => <Demo1 />;

export const 移动端触发 = () => (
  <StoryLayout>
    <Tooltip title="这是一段提示文字" trigger="click" isMobile>
      <Button raised>click</Button>
    </Tooltip>
  </StoryLayout>
);

export const 动画 = () => (
  <StoryLayout>
    <Tooltip title="fade" trigger="click" transitionComponent={Fade}>
      <Button raised>fade</Button>
    </Tooltip>

    <Tooltip title="Grow" trigger="click">
      <Button raised>默认Grow</Button>
    </Tooltip>
  </StoryLayout>
);
