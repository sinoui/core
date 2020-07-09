import React, { useMemo } from 'react';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import DatesViewStatus from '../DatesViewStatus';
import isSameMonth from '../helpers/isSameMonth';
import getDisabledDates from '../helpers/getDisabledDates';

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
   * 是否展示今天
   */
  showToday?: boolean;
  /**
   * 年份
   */
  year: number;
  /**
   * 月份
   */
  month: number;
  /**
   * 指定最小日期。
   */
  minDate?: Date;
  /**
   * 指定最大日期。
   */
  maxDate?: Date;
  /**
   * 日期单元格点击事件的回调函数。
   */
  onDateClick?: (event: React.MouseEvent<HTMLElement>, date: Date) => void;
  /**
   * 空心日期区间
   */
  outlinedDateRange?: [Date, Date];
}

const MemoDatesView = React.memo(DatesView);
const MemoDatesViewStatus = React.memo(DatesViewStatus);

/**
 * 日期区间日期视图
 */
export default function DateRangeDatesView(props: Props) {
  const {
    startDate,
    endDate,
    year,
    month,
    showToday,
    minDate,
    maxDate,
    onDateClick,
    outlinedDateRange,
    ...rest
  } = props;

  const outlinedDate =
    showToday && isSameMonth(new Date(), year, month)
      ? new Date().getDate()
      : undefined;

  const selectedDates = useMemo(
    () =>
      [startDate, endDate]
        .filter((date) => date && isSameMonth(date, year, month))
        .map((date: any) => date.getDate()),
    [endDate, month, startDate, year],
  );

  const disabledDates = useMemo(
    () => getDisabledDates(year, month, minDate, maxDate),
    [maxDate, minDate, month, year],
  );

  return (
    <div
      className="sinoui-date-range-view__datesview"
      data-year={year}
      data-month={month + 1}
      {...rest}
    >
      {outlinedDateRange && (
        <MemoDatesViewStatus
          year={year}
          month={month}
          startDate={outlinedDateRange[0]}
          endDate={outlinedDateRange[1]}
          outlined
        />
      )}
      {startDate && endDate && (
        <MemoDatesViewStatus
          year={year}
          month={month}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      <MemoDatesView
        year={year}
        month={month}
        outlinedDate={outlinedDate}
        selectedDates={selectedDates}
        disabledDates={disabledDates}
        onDateClick={onDateClick}
        isPc
      />
    </div>
  );
}
