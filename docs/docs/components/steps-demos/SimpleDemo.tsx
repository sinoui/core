/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import Steps, { Step } from '@sinoui/core/Steps';
import Button from '@sinoui/core/Button';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

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
    <ThemeProvider theme={defaultTheme}>
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
    </ThemeProvider>
  );
}

export default SimpleDemo;
