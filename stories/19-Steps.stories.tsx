import React, { useState } from 'react';
import Steps, { Step } from '@sinoui/core/Steps';
import Button from '@sinoui/core/Button';
import ArrowRightAlt from '@sinoui/icons/ArrowRightAlt';
import StarOutline from '@sinoui/icons/StarOutline';
import Star from '@sinoui/icons/Star';
import StoryLayout from './StoryLayout';

export default {
  title: 'Steps',
};

function SimpleDemo({
  labelPlacement,
  connector,
  icon,
}: {
  labelPlacement?: 'horizontal' | 'vertical';
  connector?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Steps
        current={current}
        labelPlacement={labelPlacement}
        connector={connector}
        icon={icon}
      >
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
      <div style={{ marginTop: 16 }}>
        {current > 2 ? (
          <Button onClick={() => setCurrent(0)}>重置</Button>
        ) : (
          <>
            <Button
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
            >
              上一步
            </Button>
            <Button raised onClick={() => setCurrent(current + 1)}>
              {current < 2 ? '下一步' : '完成'}
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export const 基本使用 = () => (
  <StoryLayout>
    <SimpleDemo />
  </StoryLayout>
);

export const 标签垂直布局 = () => (
  <StoryLayout>
    <SimpleDemo labelPlacement="vertical" />
  </StoryLayout>
);

export const 自定义连接器 = () => (
  <StoryLayout>
    <SimpleDemo connector={<ArrowRightAlt />} />
  </StoryLayout>
);

export const 自定义图标 = () => (
  <StoryLayout>
    <SimpleDemo icon={<Star />} />
  </StoryLayout>
);
