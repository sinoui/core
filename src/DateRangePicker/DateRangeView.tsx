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
    defaultYear,
    defaultMonth,
    showToday = true,
    ...rest
  } = props;

  const [[year, month], setYearMonth] = useState(() => {
    return startDate
      ? [startDate.getFullYear(), startDate.getMonth()]
      : [
          defaultYear ?? new Date().getFullYear(),
          defaultMonth ?? new Date().getMonth(),
        ];
  });

  return (
    <DateRangeViewWrapper className="sinoui-date-range-view">
      <DateRangeHeader
        startYear={year}
        startMonth={month}
        onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
      />
      <ContentWrapper className="sinoui-date-range-view__week-title">
        <WeekTitleBar />
        <WeekTitleBar />
      </ContentWrapper>
      <DateRangeViewContent
        {...rest}
        year={year}
        month={month}
        showToday={showToday}
        startDate={startDate}
      />
    </DateRangeViewWrapper>
  );
}
