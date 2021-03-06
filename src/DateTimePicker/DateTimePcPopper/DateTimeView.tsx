import React, { useState, useRef } from 'react';
import CalendarViewHeader from '@sinoui/core/DatePicker/CalendarView/CalendarViewHeader';
import ViewModel from '@sinoui/core/DatePicker/ViewModel';
import YearSelectView from '@sinoui/core/DatePicker/YearSelectView';
import MonthSelectView from '@sinoui/core/DatePicker/MonthSelectView';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import TimeList from '@sinoui/core/TimePicker/TimeList';
import Divider from '@sinoui/core/Divider';
import styled from 'styled-components';
import formatDate from '@sinoui/core/DatePicker/formatDate';
import SimpleMonthDatesView from '@sinoui/core/DatePicker/DatesView/SimpleMonthDatesView';
import padStart from 'lodash/padStart';
import DateTimeViewWrapper from './DateTimeViewWrapper';

export interface Props {
  /**
   * 日期
   */
  date?: Date;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * 默认年份
   */
  defaultYear?: number;
  /**
   * 默认月份
   */
  defaultMonth?: number;
  /*
   * 设置为`true`，则跳过月份选择。默认情况下，在桌面端不跳过，在移动端跳过。
   */
  skipMonthsView?: boolean;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
  /**
   * 最小日期
   */
  minDate?: Date;
  /**
   * 最大日期
   */
  maxDate?: Date;
  /**
   * 设置为`true`，则显示今日状态。默认为`true`。
   */
  showToday?: boolean;
  /**
   * 最小小时数。默认为`0`。
   */
  minHour?: number;
  /**
   * 最大小时数。默认为`23`。
   */
  maxHour?: number;
  /**
   * 最小分钟数。默认为`0`。
   */
  minMinute?: number;
  /**
   * 最大分钟数。默认为`59`。
   */
  maxMinute?: number;
  /**
   * 小时间隔
   */
  hourStep?: number;
  /**
   * 分钟间隔
   */
  minuteStep?: number;
  /**
   * 小时
   */
  hour?: number;
  /**
   * 分钟
   */
  minute?: number;
  /**
   * 时间列表失去焦点时的回调函数
   */
  onBlur?: () => void;
  /**
   * 是否展示下月日期
   */
  showNextMonthDates?: boolean;
}

const StyledDivider = styled(Divider)`
  height: 296px;
`;

/**
 * 日期时间选择展示组件
 * @param props
 */
export default React.forwardRef<HTMLDivElement, Props>(function DateTimeView(
  props,
  ref,
) {
  const now = new Date();
  const {
    date,
    defaultYear = new Date().getFullYear(),
    defaultMonth = new Date().getMonth(),
    skipMonthsView,
    startOfWeek,
    minDate,
    maxDate,
    showToday = true,
    minHour = 0,
    minMinute = 0,
    maxHour = 23,
    maxMinute = 59,
    hourStep = 1,
    minuteStep = 1,
    hour = now.getHours() - (now.getHours() % hourStep),
    minute = now.getMinutes() - (now.getMinutes() % minuteStep),
    onChange,
    showNextMonthDates = true,
    ...rest
  } = props;

  const [[year, month], setYearMonth] = useState(() => {
    return date
      ? [date.getFullYear(), date.getMonth()]
      : [defaultYear, defaultMonth];
  });

  const [viewModel, setViewModel] = useState<ViewModel>(ViewModel.dates);

  const timeListWrapperRef = useRef<HTMLDivElement>(null);

  const handleYearSelect = (newYear: number) => {
    if (newYear !== year) {
      setYearMonth([newYear, month]);
    }
    setViewModel(skipMonthsView ? ViewModel.dates : ViewModel.months);
  };

  const renderYears = () => (
    <YearSelectView
      selectedYear={year}
      onYearSelect={handleYearSelect}
      className="sinoui-date-time-view__yearsview"
      isPc
    />
  );

  const handleMonthSelect = (newMonth: number) => {
    if (newMonth !== month) {
      setYearMonth([year, newMonth]);
    }
    setViewModel(ViewModel.dates);
  };

  const renderMonths = () => (
    <MonthSelectView
      selectedMonth={month}
      onMonthSelect={handleMonthSelect}
      className="sinoui-date-time-view__monthsview"
      isPc
    />
  );

  const handleDateClick = (
    _event: React.MouseEvent<HTMLElement>,
    clickDate: Date,
  ) => {
    const newDate = clickDate ? formatDate(clickDate) : '';
    if (onChange) {
      const h = padStart(`${hour}`, 2, '0');
      const m = padStart(`${minute}`, 2, '0');
      onChange(`${newDate} ${h}:${m}`);
    }
  };

  const handleHourChange = (hourDate: number) => {
    const newDate = date ? formatDate(date) : '';

    if (onChange) {
      const h = padStart(`${hourDate}`, 2, '0');
      const m = padStart(`${minute}`, 2, '0');
      onChange(`${newDate} ${h}:${m}`);
    }
  };

  const handleMinuteChange = (minuteDate: number) => {
    const newDate = date ? formatDate(date) : '';

    if (onChange) {
      const h = padStart(`${hour}`, 2, '0');
      const m = padStart(`${minuteDate}`, 2, '0');
      onChange(`${newDate} ${h}:${m}`);
    }
  };

  const renderDates = () => (
    <>
      <WeekTitleBar startOfWeek={startOfWeek} isPc />
      <div className="sinoui-date-time-view__datesview">
        <SimpleMonthDatesView
          year={year}
          month={month}
          isPc
          showToday={showToday}
          minDate={minDate}
          maxDate={maxDate}
          value={date}
          showNextMonthDates={showNextMonthDates}
          startOfWeek={startOfWeek}
          onDateClick={handleDateClick}
        />
      </div>
    </>
  );

  return (
    <DateTimeViewWrapper className="sinoui-date-time-view" ref={ref} {...rest}>
      <div className="sinoui-date-time-view__calendar">
        <CalendarViewHeader
          year={year}
          month={month}
          onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
          onViewModelChange={setViewModel}
          viewModel={viewModel}
        />
        {viewModel === ViewModel.years && renderYears()}
        {viewModel === ViewModel.dates && renderDates()}
        {viewModel === ViewModel.months && renderMonths()}
      </div>
      <StyledDivider vertical />
      <div
        className="sinoui-date-time-select__time-list"
        ref={timeListWrapperRef}
      >
        <TimeList
          className="sinoui-date-time-select-view__hour-list"
          start={minHour}
          end={maxHour}
          selected={hour}
          step={hourStep}
          onChange={handleHourChange}
          disabledFocused
        />
        <TimeList
          className="sinoui-date-time-select-view__minute-list"
          start={minMinute}
          end={maxMinute}
          selected={minute}
          step={minuteStep}
          onChange={handleMinuteChange}
          disabledFocused
        />
      </div>
    </DateTimeViewWrapper>
  );
});
