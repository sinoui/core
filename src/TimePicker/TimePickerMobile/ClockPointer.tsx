import React from 'react';
import styled from 'styled-components';
import { CLOCK_NUMBER_PADDING, CLOCK_SIZE } from './constants';

const Wrapper = styled.div<{
  $rotateDeg: number;
}>`
  position: absolute;
  left: calc((100% - 2px) / 2);
  top: ${CLOCK_NUMBER_PADDING}px;
  width: 2px;
  height: ${CLOCK_SIZE / 2 - CLOCK_NUMBER_PADDING}px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  transform: ${({ $rotateDeg = 0 }) => `rotateZ(${$rotateDeg}deg)`};
  transform-origin: bottom;
  .sinoui-clock__pointer {
    position: absolute;
    left: calc((100% - 32px) / 2);
    top: 0;
    width: 32px;
    height: 32px;
    user-select: none;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export default function ClockPointer({ rotateDeg }: { rotateDeg: number }) {
  return (
    <Wrapper $rotateDeg={rotateDeg}>
      <div className="sinoui-clock__pointer" />
    </Wrapper>
  );
}
