import React from 'react';
import styled, { css } from 'styled-components';
import { formatHourMinute } from './utils';
import { CLOCK_NUMBER_PADDING, CLOCK_PIN_SIZE, CLOCK_SIZE } from './constants';

const selectedCss = css`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  z-index: 100;
`;

const minuteDotdCss = css`
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
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
  transform: ${({ $number }) => `rotate(${6 * $number - 90}deg) translateX(${
    (CLOCK_SIZE - 32) / 2 - CLOCK_NUMBER_PADDING
  }px)
    rotate(${90 - 6 * $number}deg)`};
  ${(props) => props.$selected && selectedCss};
`;

const MinuteDot = styled.div<{
  $selected?: boolean;
}>`
  width: ${CLOCK_PIN_SIZE}px;
  height: ${CLOCK_PIN_SIZE}px;
  position: absolute;
  border-radius: 50%;
  background-color: transparent;
  ${(props) => props.$selected && minuteDotdCss};
`;

/**
 * 表盘上的 分钟
 */
export default function ClockMinute({
  number,
  selectedValue,
}: {
  number: number;
  selectedValue: number;
}) {
  const showedMinute = number === 60 ? `00` : formatHourMinute(number);
  return (
    <Wrapper
      $number={number}
      $selected={selectedValue === number}
      data-minute-value={number}
    >
      {number % 5 === 0 ? (
        showedMinute
      ) : (
        <MinuteDot $selected={selectedValue === number} />
      )}
    </Wrapper>
  );
}
