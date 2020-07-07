import React, { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import closest from 'dom-helpers/closest';
import getOutlinedDateRange from './helpers/getOutlinedDateRange';
import { CLASSES } from '../DatePicker/constants';
import parseDate from '../DatePicker/parseDate';
import DateRangeDatesView from './DateRangeDatesView';
import HoverOutline from './HoverOutline';

const ContentWrapper = styled.div`
  display: flex;
  position: relative;
`;

interface Props {
  /**
   * 开始时间
   */
  startDate?: Date;
  /**
   * 结束时间
   */
  endDate?: Date;
  /**
   * 聚焦的输入框
   */
  focusedInput?: 'start' | 'end';
  /**
   * 年份
   */
  year: number;
  /**
   * 月份
   */
  month: number;
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
 * 日期区间视图内容
 *
 */
export default function DateRangeViewContent({
  focusedInput,
  startDate,
  endDate,
  year,
  month,
  ...rest
}: Props) {
  const [hoverDate, setHoverDate] = useState<Date>();
  const mouseLeaveTimeout = useRef(-1);
  const outlinedDateRange = useMemo(
    () =>
      focusedInput
        ? getOutlinedDateRange(focusedInput, startDate, endDate, hoverDate)
        : undefined,
    [endDate, focusedInput, hoverDate, startDate],
  );
  const endMonth = month === 11 ? 0 : month + 1;
  const endYear = month === 11 ? year + 1 : year;

  /**
   * 延迟清除悬停日期
   */
  const clearHoverDateDelay = () => {
    clearTimeout(mouseLeaveTimeout.current);
    mouseLeaveTimeout.current = setTimeout(() => {
      setHoverDate(undefined);
    }, 100);
  };

  /**
   * 处理鼠标悬停事件
   *
   * @param event 鼠标事件
   */
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const dateCell = closest(
      event.target as HTMLElement,
      `.${CLASSES.dateCell}`,
    ) as HTMLElement;
    const isDisabled =
      dateCell && dateCell.classList.contains(`${CLASSES.dateCell}--disabled`);
    const newHoverDate = parseDate(dateCell?.dataset?.date);
    clearTimeout(mouseLeaveTimeout.current);
    if (!isDisabled && newHoverDate) {
      setHoverDate(newHoverDate);
    }
    if (!newHoverDate) {
      clearHoverDateDelay();
    }
  };

  return (
    <ContentWrapper
      className="sinoui-date-range-view__datesview-wrapper"
      onMouseOver={handleMouseOver}
      onMouseLeave={clearHoverDateDelay}
      onFocus={() => undefined}
    >
      {outlinedDateRange && hoverDate && (
        <HoverOutline hoverDate={hoverDate} year={year} month={month} />
      )}
      <DateRangeDatesView
        startDate={startDate}
        endDate={endDate}
        year={year}
        month={month}
        outlinedDateRange={outlinedDateRange}
        {...rest}
      />
      <DateRangeDatesView
        startDate={startDate}
        endDate={endDate}
        year={endYear}
        month={endMonth}
        outlinedDateRange={outlinedDateRange}
        {...rest}
      />
    </ContentWrapper>
  );
}
