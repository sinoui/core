import React from 'react';
import styled, { css } from 'styled-components';

const selectedCss = css`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
`;

const Wrapper = styled.div<{
  $number: number;
  $size: number;
  $selected?: boolean;
}>`
  display: inline-flex;
  position: absolute;
  left: calc((100% - 32px) / 2);
  top: calc((100% - 32px) / 2);
  width: 32px;
  height: 32px;
  align-items: center;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  z-index: 100;
  ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.text.primary};
  transform: ${({ $number, $size }) => `rotate(${
    30 * $number - 90
  }deg) translateX(${($size - 32) / 2}px)
    rotate(${90 - 30 * $number}deg)`};
  ${(props) => props.$selected && selectedCss};
`;

/**
 * 时钟上的数字
 */
export default function ClockNumber({
  $number,
  $size,
  selected,
}: {
  $number: number;
  $size: number;
  selected?: boolean;
}) {
  return (
    <Wrapper $number={$number} $size={$size} $selected={selected}>
      {$number}
    </Wrapper>
  );
}
