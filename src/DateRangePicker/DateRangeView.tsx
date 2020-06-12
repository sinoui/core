import React, { useState, useMemo, useCallback } from 'react';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import styled from 'styled-components';
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
  /**
   * 日期单元格点击事件的回调函数。
   */
  onDateClick?: (event: React.MouseEvent<HTMLElement>, date: Date) => void;
}

/**
 * 判断是否处在hover区间的方法
 * @param date 当前日期
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param hoverDate hover日期
 */
function isInHoverRange(
  date: Date,
  startDate?: Date,
  endDate?: Date,
  hoverDate?: Date,
) {
  if (!hoverDate) {
    return false;
  }

  if (startDate) {
    if (endDate) {
      return (
        (date >= endDate && date <= hoverDate) ||
        (date >= hoverDate && date < startDate)
      );
    }
    return (
      (date >= startDate && date <= hoverDate) ||
      (date >= hoverDate && date < startDate)
    );
  }

  if (endDate) {
    return date < endDate && date >= hoverDate;
  }

  return false;
}

/**
 * 判断是否是hover区间的开始的方法
 * @param date
 * @param startDate
 * @param endDate
 * @param hoverDate
 */
function isHoverRangeStart(
  date: Date,
  startDate?: Date,
  endDate?: Date,
  hoverDate?: Date,
) {
  if (hoverDate) {
    if (startDate) {
      return (
        hoverDate.getTime() === date.getTime() &&
        date.getTime() < startDate.getTime()
      );
    }

    if (endDate) {
      return (
        hoverDate.getTime() === date.getTime() &&
        date.getTime() < endDate.getTime()
      );
    }

    return false;
  }

  return false;
}

/**
 * 判断是否是hover区间结束的方法
 * @param date
 * @param startDate
 * @param endDate
 * @param hoverDate
 */
function isHoverRangeEnd(
  date: Date,
  startDate?: Date,
  endDate?: Date,
  hoverDate?: Date,
) {
  if (hoverDate) {
    if (endDate) {
      return (
        hoverDate.getTime() === date.getTime() &&
        date.getTime() >= endDate.getTime()
      );
    }

    if (startDate) {
      return (
        hoverDate.getTime() === date.getTime() &&
        date.getTime() >= startDate.getTime()
      );
    }

    return false;
  }

  return false;
}

const ContentWrapper = styled.div`
  display: flex;
`;

/**
 * 日期区间选择的展示
 * @param props
 */
export default function DateRangeView(props: Props) {
  const {
    startDate,
    endDate,
    defaultYear,
    defaultMonth,
    showToday = true,
    minDate,
    maxDate,
    onDateClick,
  } = props;

  const [[year, month], setYearMonth] = useState(() => {
    return startDate
      ? [startDate.getFullYear(), startDate.getMonth()]
      : [
          defaultYear ?? new Date().getFullYear(),
          defaultMonth ?? new Date().getMonth(),
        ];
  });

  const [hoverDate, setHoverDate] = useState<Date>();

  const endMonth = useMemo(() => (month === 11 ? 0 : month + 1), [month]);

  const endYear = useMemo(() => (month === 11 ? year + 1 : year), [
    month,
    year,
  ]);

  const handleDateMouseEnter = (
    _event: React.MouseEvent<HTMLElement>,
    date: Date,
  ) => {
    setHoverDate(date);
  };

  const handleDateMouseLeave = () => {
    setHoverDate(undefined);
  };

  const getIsInHoverRange = useCallback(
    (date: Date) => {
      return isInHoverRange(date, startDate, endDate, hoverDate);
    },
    [endDate, hoverDate, startDate],
  );

  const getIsHoverRangeStart = useCallback(
    (date: Date) => {
      return isHoverRangeStart(date, startDate, endDate, hoverDate);
    },
    [endDate, hoverDate, startDate],
  );

  const getIsHoverRangeEnd = useCallback(
    (date: Date) => {
      return isHoverRangeEnd(date, startDate, endDate, hoverDate);
    },
    [endDate, hoverDate, startDate],
  );

  const renderDates = () => (
    <>
      <ContentWrapper className="sinoui-date-range-view__week-title">
        <WeekTitleBar />
        <WeekTitleBar />
      </ContentWrapper>
      <ContentWrapper className="sinoui-date-range-view__datesview-wrapper">
        <DateRangeDatesView
          startDate={startDate}
          endDate={endDate}
          year={year}
          month={month}
          showToday={showToday}
          minDate={minDate}
          maxDate={maxDate}
          onDateMouseEnter={handleDateMouseEnter}
          onDateMouseLeave={handleDateMouseLeave}
          isInHoverRange={getIsInHoverRange}
          isHoverRangeStart={getIsHoverRangeStart}
          isHoverRangeEnd={getIsHoverRangeEnd}
          onDateClick={onDateClick}
        />
        <DateRangeDatesView
          startDate={startDate}
          endDate={endDate}
          year={endYear}
          month={endMonth}
          showToday={showToday}
          minDate={startDate}
          maxDate={maxDate}
          onDateMouseEnter={handleDateMouseEnter}
          onDateMouseLeave={handleDateMouseLeave}
          isInHoverRange={getIsInHoverRange}
          isHoverRangeStart={getIsHoverRangeStart}
          isHoverRangeEnd={getIsHoverRangeEnd}
          onDateClick={onDateClick}
        />
      </ContentWrapper>
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
