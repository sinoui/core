import React, { useState } from 'react';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import styled from 'styled-components';
import DateRangeHeader from './DateRangeHeader';
import DateRangeViewWrapper from './DateRangeViewWrapper';
import DateRangeViewContent from './DateRangeViewContent';

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
  /**
   * 聚焦的输入框
   */
  focusedInput?: 'start' | 'end';
  /*
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
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
    defaultYear = new Date().getFullYear(),
    defaultMonth = new Date().getMonth(),
    showToday = true,
    startOfWeek,
    ...rest
  } = props;

  const [[year, month], setYearMonth] = useState(() => {
    return startDate
      ? [startDate.getFullYear(), startDate.getMonth()]
      : [defaultYear, defaultMonth];
  });

  return (
    <DateRangeViewWrapper className="sinoui-date-range-view">
      <DateRangeHeader
        startYear={year}
        startMonth={month}
        onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
      />
      <ContentWrapper className="sinoui-date-range-view__week-title">
        <WeekTitleBar isPc startOfWeek={startOfWeek} />
        <WeekTitleBar isPc startOfWeek={startOfWeek} />
      </ContentWrapper>
      <DateRangeViewContent
        {...rest}
        year={year}
        month={month}
        showToday={showToday}
        startDate={startDate}
        startOfWeek={startOfWeek}
      />
    </DateRangeViewWrapper>
  );
}
