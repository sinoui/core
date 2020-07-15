import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ number: number }>`
  display: inline-flex;
  position: absolute;
  left: calc((100% - 32px) / 2);
  width: 32px;
  height: 32px;
  align-items: center;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  background: red;
  ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.text.primary};
`;

/**
 * 时钟上的数字
 */
export default function ClockNumber({ number }: { number: number }) {
  return <Wrapper number={number}>{number}</Wrapper>;
}
