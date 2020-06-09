import React, { useState, useMemo } from 'react';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import DateRangeHeader from './DateRangeHeader';
import DateRangeViewWrapper from './DateRangeViewWrapper';
import DateRangeDatesView from './DateRangeDatesView';

export interface Props {
  /**
   * 开始时间
   */
  startDate?: Date;
  /**
   * 结束时间
   */
  endDate?: Date;
  /**
   * 默认年份
   */
  defaultYear?: number;
  /**
   * 默认月份
   */
  defaultMonth?: number;
  /**
   * 设置为`true`，则显示今日状态。默认为`true`。
   */
  showToday?: boolean;
  /**
   * 指定最小日期。
   */
  minDate?: Date;
  /**
   * 指定最大日期。
   */
  maxDate?: Date;
}

export default function DateRangeView(props: Props) {
  const {
    startDate,
    endDate,
    defaultYear,
    defaultMonth,
    showToday = true,
    minDate,
    maxDate,
  } = props;

  const [[year, month], setYearMonth] = useState(() => {
    return startDate
      ? [startDate.getFullYear(), startDate.getMonth()]
      : [
          defaultYear ?? new Date().getFullYear(),
          defaultMonth ?? new Date().getMonth(),
        ];
  });

  const endMonth = useMemo(() => (month === 11 ? 0 : month + 1), [month]);

  const endYear = useMemo(() => (month === 11 ? year + 1 : year), [
    month,
    year,
  ]);

  const renderDates = () => (
    <>
      <div style={{ display: 'flex' }}>
        <WeekTitleBar />
        <WeekTitleBar />
      </div>
      <div style={{ display: 'flex' }}>
        <DateRangeDatesView
          startDate={startDate}
          endDate={endDate}
          year={year}
          month={month}
          showToday={showToday}
          minDate={minDate}
          maxDate={maxDate}
        />
        <DateRangeDatesView
          startDate={startDate}
          endDate={endDate}
          year={endYear}
          month={endMonth}
          showToday={showToday}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    </>
  );
  return (
    <DateRangeViewWrapper>
      <DateRangeHeader
        startYear={year}
        startMonth={month}
        onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
      />
      {renderDates()}
    </DateRangeViewWrapper>
  );
}
