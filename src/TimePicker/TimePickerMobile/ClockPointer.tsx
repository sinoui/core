import React from 'react';
import styled from 'styled-components';
import { CLOCK_NUMBER_PADDING, CLOCK_SIZE, CLOCK_PIN_SIZE } from './constants';

const Wrapper = styled.div<{
  $rotateDeg: number;
}>`
  position: absolute;
  left: calc((100% - 2px) / 2);
  top: ${CLOCK_NUMBER_PADDING}px;
  width: 2px;
  height: ${CLOCK_SIZE / 2 - CLOCK_NUMBER_PADDING}px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  transition: ${({ theme }) => theme.transitions.create('transform')};
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

const MinuteDot = styled.div<{
  $selected?: boolean;
}>`
  position: absolute;
  left: 50%;
  top: ${CLOCK_NUMBER_PADDING + 16}px;
  width: ${CLOCK_PIN_SIZE}px;
  height: ${CLOCK_PIN_SIZE}px;
  border-radius: 50%;
  background-color: #fff;
  transform: translate(-${CLOCK_PIN_SIZE / 2}px, -8px);
`;

export default function ClockPointer({
  rotateDeg,
  isHourView,
  ...rest
}: {
  rotateDeg: number;
  isHourView: boolean;
}) {
  return (
    <Wrapper $rotateDeg={rotateDeg} {...rest}>
      <div className="sinoui-clock__pointer" />
      {!isHourView && rotateDeg % 5 !== 0 && (
        <MinuteDot className="sinoui-clock__pointer-minute-dot" />
      )}
    </Wrapper>
  );
}
