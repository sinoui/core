/* eslint-disable react/require-default-props */
import Steps, { Step } from '@sinoui/core/Steps';
import { defaultTheme } from '@sinoui/theme';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

function NoLinerDemo({
  labelPlacement,
  direction,
}: {
  labelPlacement?: 'horizontal' | 'vertical';
  direction?: 'horizontal' | 'vertical';
}) {
  const [current, setCurrent] = useState(0);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Steps
        current={current}
        labelPlacement={labelPlacement}
        direction={direction}
        onChange={(index: number) => setCurrent(index)}
      >
        <Step title="第一步" />
        <Step
          title="第二步"
          subTitle="Left 00:00:08"
          description="This is a description."
        />
        <Step title="第三步" />
      </Steps>
    </ThemeProvider>
  );
}

export default NoLinerDemo;
