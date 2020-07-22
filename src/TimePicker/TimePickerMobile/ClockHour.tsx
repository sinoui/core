import React from 'react';
import styled, { css } from 'styled-components';
import { CLOCK_NUMBER_PADDING, CLOCK_SIZE } from './constants';

const selectedCss = css`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  z-index: 100;
`;

const Wrapper = styled.div<{
  $number: number;
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
  z-index: 101;
  ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.text.primary};
  transform: ${({ $number }) => `rotate(${30 * $number - 90}deg) translateX(${
    (CLOCK_SIZE - 32) / 2 - CLOCK_NUMBER_PADDING
  }px)
    rotate(${90 - 30 * $number}deg)`};
  ${(props) => props.$selected && selectedCss};
`;

/**
 * 表盘上的 小时
 */
export default function ClockHour({
  number,
  selectedValue,
}: {
  number: number;
  selectedValue: number;
}) {
  return (
    <Wrapper
      $number={number}
      $selected={selectedValue === number}
      data-hour-value={number}
    >
      {number}
    </Wrapper>
  );
}
