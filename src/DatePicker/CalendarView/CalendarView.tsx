import React, { useState } from 'react';
import CalendarViewHeader from './CalendarViewHeader';
import WeekTitleBar from '../WeekTitleBar';
import DatesView from '../DatesView';
import CalendarViewWrapper from './CalendarViewWrapper';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 默认的年份
   */
  defaultYear?: number;
  /**
   * 默认的月份
   */
  defaultMonth?: number;
}

/**
 * 日历视图
 */
export default function CalendarView({
  defaultYear,
  defaultMonth,
  ...rest
}: Props) {
  const [[year, month], setYearMonth] = useState(() => [
    defaultYear ?? new Date().getFullYear(),
    defaultMonth ?? new Date().getMonth(),
  ]);

  return (
    <CalendarViewWrapper {...rest}>
      <CalendarViewHeader
        year={year}
        month={month}
        onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
      />
      <WeekTitleBar />
      <div className="sinoui-calendar-view__datesview">
        <DatesView year={year} month={month} showNextMonthDates />
      </div>
    </CalendarViewWrapper>
  );
}
