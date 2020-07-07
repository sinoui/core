import React, { useMemo } from 'react';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import getDatesOfMonth from '@sinoui/core/DatePicker/DatesView/getDatesOfMonth';
import isSameMonth from './utils/isSameMonth';

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
   * 鼠标移入日期单元格时的回调函数
   */
  onDateMouseEnter?: (event: React.MouseEvent<HTMLElement>, date: Date) => void;
  /**
   * 鼠标移出时的回调函数
   */
  onDateMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 是否在hover区间
   */
  isInHoverRange?: (date: Date) => boolean;
  /**
   * 是否是hover区间的开始
   */
  isHoverRangeStart?: (date: Date) => boolean;
  /**
   * 是否是hover区间的结束
   */
  isHoverRangeEnd?: (date: Date) => boolean;
  /**
   * 日期单元格点击事件的回调函数。
   */
  onDateClick?: (event: React.MouseEvent<HTMLElement>, date: Date) => void;
}

/**
 * 是否大于指定日期
 * @param value
 * @param year
 * @param month
 * @param date
 */
function isGreaterThen(value: Date, year: number, month: number, date: number) {
  return (
    new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      0,
      0,
      0,
    ).getTime() > new Date(year, month, date, 0, 0, 0).getTime()
  );
}

/**
 * 获取不可用的日期
 * @param year
 * @param month
 * @param minDate
 * @param maxDate
 */
function getDisabledDates(
  year: number,
  month: number,
  minDate?: Date,
  maxDate?: Date,
) {
  const dates = getDatesOfMonth(year, month);
  const disabledDates: number[] = [];

  for (let i = 0; i < dates; i += 1) {
    if (
      (minDate && isGreaterThen(minDate, year, month, i + 1)) ||
      (maxDate && !isGreaterThen(maxDate, year, month, i + 1))
    ) {
      disabledDates.push(i + 1);
    }
  }

  return disabledDates.length !== 0 ? disabledDates : undefined;
}

/**
 * 获取日期区间段
 * @param year
 * @param month
 * @param startDate
 * @param endDate
 */
function getInRangeDates(
  year: number,
  month: number,
  startDate?: Date,
  endDate?: Date,
) {
  const dates = getDatesOfMonth(year, month);
  const inRangeDates: number[] = [];

  for (let i = 0; i < dates; i += 1) {
    if (
      startDate &&
      !isGreaterThen(startDate, year, month, i + 1) &&
      endDate &&
      (isGreaterThen(endDate, year, month, i + 1) ||
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          0,
          0,
          0,
        ).getTime() === new Date(year, month, i + 1, 0, 0, 0).getTime())
    ) {
      inRangeDates.push(i + 1);
    }
  }

  return inRangeDates.length !== 0 ? inRangeDates : undefined;
}

export default function DateRangeDatesView(props: Props) {
  const {
    startDate,
    endDate,
    year,
    month,
    showToday,
    minDate = new Date(),
    maxDate,
    onDateMouseEnter,
    onDateMouseLeave,
    isInHoverRange,
    isHoverRangeStart,
    isHoverRangeEnd,
    onDateClick,
  } = props;

  const outlinedDate =
    showToday && isSameMonth(new Date(), year, month)
      ? new Date().getDate()
      : undefined;

  const selectedDates = useMemo(() => {
    return [startDate, endDate]
      .map((date) =>
        isSameMonth(date, year, month) ? date.getDate() : undefined,
      )
      .filter(Boolean);
  }, [endDate, month, startDate, year]);

  return (
    <div className="sinoui-date-range-view__datesview">
      <DatesView
        year={year}
        month={month}
        outlinedDate={outlinedDate}
        selectedDates={selectedDates as number[]}
        disabledDates={getDisabledDates(year, month, minDate, maxDate)}
        selectedRangeDates={getInRangeDates(year, month, startDate, endDate)}
        onDateClick={onDateClick}
        onDateMouseEnter={onDateMouseEnter}
        onMouseLeave={onDateMouseLeave}
        isInHoverRange={isInHoverRange}
        isHoverRangeStart={isHoverRangeStart}
        isHoverRangeEnd={isHoverRangeEnd}
      />
    </div>
  );
}
