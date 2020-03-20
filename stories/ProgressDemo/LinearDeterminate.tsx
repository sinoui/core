import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Progress from '@sinoui/core/Progress';

const Wrapper = styled.div`
  height: 100vh;
  padding-top: 100px;
`;
export default function Demo({
  linear,
  determinate,
  buffer,
}: {
  linear?: boolean;
  determinate?: boolean;
  buffer?: boolean;
}) {
  const [progressValue, setProgressValue] = useState(0);

  const max = 30;
  const min = 10;
  const step = Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    let timer: any;
    if (determinate) {
      timer = setInterval(() => {
        if (progressValue + step <= 100) {
          setProgressValue(progressValue + step);
        } else {
          setProgressValue(100);
          clearInterval(timer as any);
        }
      }, 1000);
    }

    return () => clearInterval(timer as any);
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>
        <Progress
          linear={linear}
          value={progressValue}
          determinate={determinate}
          buffer={buffer}
        />
      </Wrapper>
    </ThemeProvider>
  );
}
