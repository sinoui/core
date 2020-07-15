import React from 'react';
import SimpleMonthDatesView from '@sinoui/core/DatePicker/DatesView/SimpleMonthDatesView';
import DatesViewStatus from '../DatesViewStatus';

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
  /*
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
}

const MemoDatesView = React.memo(SimpleMonthDatesView);
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
    startOfWeek,
    ...rest
  } = props;

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
          startOfWeek={startOfWeek}
        />
      )}
      {startDate && endDate && (
        <MemoDatesViewStatus
          year={year}
          month={month}
          startDate={startDate}
          endDate={endDate}
          startOfWeek={startOfWeek}
        />
      )}
      <MemoDatesView
        year={year}
        month={month}
        showToday={showToday}
        minDate={minDate}
        maxDate={maxDate}
        value={[startDate, endDate]}
        onDateClick={onDateClick}
        startOfWeek={startOfWeek}
        isPc
      />
    </div>
  );
}
