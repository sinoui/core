import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{
  $size: number;
}>`
  position: absolute;
  left: calc((100% - 2px) / 2);
  top: 0;
  width: 2px;
  height: ${({ $size }) => $size / 2}px;
  background-color: ${({ theme }) => theme.palette.primary.main};

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

export default function ClockPointer({ size }: { size: number }) {
  return (
    <Wrapper $size={size}>
      <div className="sinoui-clock__pointer" />
    </Wrapper>
  );
}
