import React from 'react';
import styled from 'styled-components';
import Caption from '@sinoui/core/Caption';
import H5 from '@sinoui/core/H5';

interface Props {
  /**
   * 标题
   */
  title: string;
  /**
   * 显示的值
   */
  value: string;
}

const CalendarViewToolbarWrapper = styled.div`
  height: 96px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};

  & > * {
    color: currentColor;
  }
`;

/**
 * 日历视图的工具栏
 */
const CalendarViewToolbar = ({ title, value, ...rest }: Props) => {
  const [year, month] = value.split('-');
  return (
    <CalendarViewToolbarWrapper
      className="sinoui-calendar-view-toolbar"
      {...rest}
    >
      <Caption>{title}</Caption>
      <H5>
        {year}年{Number(month)}月
      </H5>
    </CalendarViewToolbarWrapper>
  );
};

export default CalendarViewToolbar;
