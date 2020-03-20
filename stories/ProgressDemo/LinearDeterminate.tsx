import React, { useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Progress from '@sinoui/core/Progress';
import Button from '@sinoui/core/Button';

const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export default function Demo({
  linear,
  determinate,
  buffer,
  size,
  thickness,
}: {
  linear?: boolean;
  determinate?: boolean;
  buffer?: boolean;
  size?: number;
  thickness?: number;
}) {
  const [progressValue, setProgressValue] = useState(0);
  const [loading, setLoading] = useState(!determinate);
  const max = 30;
  const min = 10;
  const step = Math.floor(Math.random() * (max - min + 1) + min);
  const timer = useRef<any>();
  const onClick = () => {
    if (determinate && !loading) {
      setProgressValue(0);
      setLoading(true);
      timer.current = setInterval(() => {
        setProgressValue((prev: number) => {
          if (prev + step < 100) {
            return prev + step;
          }
          const timeOut = setTimeout(() => {
            setLoading(false);
            clearInterval(timer.current);
            clearTimeout(timeOut);
          }, 500);

          return 100;
        });
      }, 1000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {determinate && (
        <Button raised onClick={onClick} disabled={loading}>
          点击加载
        </Button>
      )}
      {loading && (
        <Wrapper>
          <Progress
            linear={linear}
            value={progressValue}
            determinate={determinate}
            buffer={buffer}
            thickness={thickness}
            size={size}
          />
        </Wrapper>
      )}
    </ThemeProvider>
  );
}
