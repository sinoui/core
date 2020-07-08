import React from 'react';
import styled from 'styled-components';
import getWeekNoOfMonth from './helpers/getWeekNoOfMonth';
import isSameMonth from './helpers/isSameMonth';
import getDayOfWeek from './helpers/getDayOfWeek';

const HoverOutlineWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.text.disabled};
  border-radius: 14px;
  transition: ${({ theme }) =>
    theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })};
`;

/**
 * 悬停轮廓
 */
const HoverOutline = ({
  hoverDate,
  year,
  month,
  ...rest
}: {
  hoverDate: Date;
  year: number;
  month: number;
}) => {
  const weekNo = getWeekNoOfMonth(hoverDate);
  const dayOfWeek = getDayOfWeek(hoverDate);

  const x =
    (isSameMonth(hoverDate, year, month) ? 16 : 256 + 16) + dayOfWeek * 32 + 2;
  const y = weekNo * 32 + 2;

  return (
    <HoverOutlineWrapper
      className="sinoui-date-range-picker__hover-outline"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      {...rest}
    />
  );
};

export default HoverOutline;
