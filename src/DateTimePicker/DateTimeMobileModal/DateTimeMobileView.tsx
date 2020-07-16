import React, { useState } from 'react';
import CalendarViewAction from '@sinoui/core/DatePicker/CalendarView/CalendarViewAction';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import CalendarViewHeader from '@sinoui/core/DatePicker/CalendarView/CalendarViewHeader';
import ViewModel from '@sinoui/core/DatePicker/ViewModel';
import YearSelectView from '@sinoui/core/DatePicker/YearSelectView';
import TextInput from '@sinoui/core/TextInput';
import styled from 'styled-components';
import Body2 from '@sinoui/core/Body2';
import Subtitle1 from '@sinoui/core/Subtitle1';
import formatDate from '@sinoui/core/DatePicker/formatDate';
import DateTimeMobileViewWrapper from './DateTimeMobileViewWrapper';
import DateTimeMobileViewToolbar from './DateTimeMobileViewToolbar';

interface Props {
  /**
   * 日期
   */
  date?: Date;
  /**
   * 默认年份
   */
  defaultYear?: number;
  /**
   * 默认月份
   */
  defaultMonth?: number;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
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
  /*
   * 设置为`true`，则跳过月份选择。默认情况下，在桌面端不跳过，在移动端跳过。
   */
  skipMonthsView?: boolean;
  /**
   * 弹窗关闭时的回调函数
   */
  onClose?: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const TimeWrapper = styled.div`
  padding: 16px;
  display: inline-flex;
  align-items: center;
`;

const Divider = styled(Body2)`
  width: 48px;
  text-align: center;
`;

const TimeTitle = styled(Subtitle1)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  padding: 16px 16px 0px;
`;

/**
 * 日期时间选择移动端视图
 */
export default function DateTimeMobileView(props: Props) {
  const {
    date,
    startOfWeek,
    defaultYear = new Date().getFullYear(),
    defaultMonth = new Date().getMonth(),
    style,
    skipMonthsView = true,
    onClose,
    onChange,
  } = props;

  const [[year, month], setYearMonth] = useState(() => {
    return date
      ? [date.getFullYear(), date.getMonth()]
      : [defaultYear, defaultMonth];
  });
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    return date || new Date();
  });
  const [viewModel, setViewModel] = useState<ViewModel>(ViewModel.dates);
  const [hour, setHour] = useState<string>(() => {
    return date ? `${date.getHours()}` : `${new Date().getHours()}`;
  });
  const [minute, setMinute] = useState<string>(() => {
    return date ? `${date.getMinutes()}` : `${new Date().getMinutes()}`;
  });

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
      className="sinoui-date-time-mobile-view__yearsview"
      isPc={false}
    />
  );

  const onDateClick = (
    _event: React.MouseEvent<HTMLElement>,
    clickDate: Date,
  ) => {
    setSelectedDate(clickDate);
  };

  const renderDates = () => (
    <>
      <WeekTitleBar startOfWeek={startOfWeek} />
      <div className="sinoui-date-time-mobile-view__datesview">
        <DatesView year={year} month={month} onDateClick={onDateClick} />
      </div>
    </>
  );

  const onHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHour(event.target.value);
  };

  const onMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(event.target.value);
  };

  const renderTime = () => (
    <>
      <TimeTitle>请输入时间</TimeTitle>
      <TimeWrapper>
        <TextInput
          type="number"
          placeholder={hour}
          helperText="点"
          value={hour}
          onChange={onHourChange}
        />
        <Divider>:</Divider>
        <TextInput
          type="number"
          placeholder={minute}
          helperText="分"
          value={minute}
          onChange={onMinuteChange}
        />
      </TimeWrapper>
    </>
  );

  const onClear = () => {
    if (onChange) {
      onChange('');
    }
    if (onClose) {
      onClose();
    }
  };

  const onOk = () => {
    if (onChange) {
      onChange(`${formatDate(selectedDate)} ${hour}:${minute}`);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <DateTimeMobileViewWrapper
      style={style}
      className="sinoui-date-time-mobile-view"
    >
      <DateTimeMobileViewToolbar
        year={year}
        month={month}
        day={selectedDate.getDate()}
        hour={hour}
        minute={minute}
        viewModel={viewModel}
        onViewModelChange={setViewModel}
      />
      {viewModel !== ViewModel.time && (
        <CalendarViewHeader
          year={year}
          month={month}
          onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
          viewModel={viewModel}
          onViewModelChange={setViewModel}
        />
      )}
      {viewModel === ViewModel.years && renderYears()}
      {viewModel === ViewModel.dates && renderDates()}
      {viewModel === ViewModel.time && renderTime()}
      <CalendarViewAction onCancel={onClose} onClear={onClear} onOk={onOk} />
    </DateTimeMobileViewWrapper>
  );
}
