import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{
  $rotateDeg: number;
}>`
  position: absolute;
  left: calc((100% - 2px) / 2);
  width: 2px;
  height: 40%;
  bottom: 50%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  transition: ${({ theme }) => theme.transitions.create('transform')};
  transform: ${({ $rotateDeg = 0 }) => `rotateZ(${$rotateDeg}deg)`};
  transform-origin: center bottom 0;
`;

const MinuteDot = styled.div<{
  $selected?: boolean;
}>`
  top: -21px;
  left: -15px;
  width: 4px;
  border: 14px solid ${({ theme }) => theme.palette.primary.main};
  height: 4px;
  position: absolute;
  box-sizing: content-box;
  border-radius: 100%;
  background-color: ${({ theme, $selected }) =>
    $selected ? '#fff' : theme.palette.primary.main};
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
      <MinuteDot
        className="sinoui-clock__pointer-minute-dot"
        $selected={!isHourView && rotateDeg % 5 !== 0}
      />
    </Wrapper>
  );
}
