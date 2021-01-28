import React, { useState } from 'react';
import Steps, { Step } from '@sinoui/core/Steps';
import Button from '@sinoui/core/Button';
import StoryLayout from './StoryLayout';

export default {
  title: 'Steps',
};

function SimpleDemo() {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Steps current={current}>
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
      <div style={{ marginTop: 16 }}>
        <Button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
        >
          上一步
        </Button>
        <Button
          raised
          onClick={() => setCurrent(current < 2 ? current + 1 : 2)}
        >
          {current < 2 ? '下一步' : '完成'}
        </Button>
      </div>
    </>
  );
}

export const 基本使用 = () => (
  <StoryLayout>
    <SimpleDemo />
  </StoryLayout>
);
