import React from 'react';
import styled from 'styled-components';
import WeekTitle from './WeekTitle';

interface Props {
  /**
   * 星期开始的位置。`0`表示为星期日，`1`表示为星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
}

const weekTitles = ['一', '二', '三', '四', '五', '六', '日'];

const WeekTitleBarWrapper = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  -ms-grid-row: auto;
  grid-template-columns: repeat(7, 1fr);
  -ms-grid-column-span: 4px;
  grid-column-gap: 4px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    -ms-grid-column-span: 0px;
    grid-column-gap: 0px;
  }
`;

/**
 * 周标题栏
 */
export default function WeekTitleBar({ startOfWeek = 1, ...rest }: Props) {
  const titles =
    startOfWeek === 1 ? weekTitles : [weekTitles[6], ...weekTitles.slice(0, 6)];
  return (
    <WeekTitleBarWrapper {...rest} className="sinoui-week-title-bar">
      {titles.map((title, index) => (
        <WeekTitle key={title} $column={index + 1}>
          {title}
        </WeekTitle>
      ))}
    </WeekTitleBarWrapper>
  );
}
