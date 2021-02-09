import React, { useState } from 'react';
import Steps, { Step } from '@sinoui/core/Steps';
import Button from '@sinoui/core/Button';
import ArrowRightAlt from '@sinoui/icons/ArrowRightAlt';
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

function SimpleDemoWithDescirption() {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Steps current={current}>
        <Step
          title="第一步"
          subTitle="Left 00:00:08"
          description="This is a description."
        />
        <Step title="第二步" description="This is a description." />
        <Step title="第三步" description="This is a description." />
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

export const 带副标题的示例 = () => (
  <StoryLayout>
    <SimpleDemoWithDescirption />
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

function NoLinerDemo({
  labelPlacement,
}: {
  labelPlacement?: 'horizontal' | 'vertical';
}) {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Steps
        current={current}
        labelPlacement={labelPlacement}
        onChange={(index: number) => setCurrent(index)}
      >
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </>
  );
}

export const 非线性步进器 = () => (
  <StoryLayout>
    <NoLinerDemo />
  </StoryLayout>
);

export const 标签垂直布局的非线性步进器 = () => (
  <StoryLayout>
    <NoLinerDemo labelPlacement="vertical" />
  </StoryLayout>
);

function VerticalDemo({
  labelPlacement,
}: {
  labelPlacement?: 'horizontal' | 'vertical';
}) {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Steps
        current={current}
        labelPlacement={labelPlacement}
        direction="vertical"
        onChange={(index: number) => setCurrent(index)}
      >
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </>
  );
}

export const 垂直布局 = () => (
  <StoryLayout>
    <div style={{ height: 400, width: 300 }}>
      <Steps current={1} direction="vertical">
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </div>
  </StoryLayout>
);

export const 标签垂直布局的垂直步进器 = () => (
  <StoryLayout>
    <div style={{ height: 400, width: 300 }}>
      <VerticalDemo labelPlacement="vertical" />
    </div>
  </StoryLayout>
);
