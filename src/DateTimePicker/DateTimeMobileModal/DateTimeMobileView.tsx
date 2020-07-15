import React, { useState } from 'react';
import CalendarViewAction from '@sinoui/core/DatePicker/CalendarView/CalendarViewAction';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import CalendarViewHeader from '@sinoui/core/DatePicker/CalendarView/CalendarViewHeader';
import ViewModel from '@sinoui/core/DatePicker/ViewModel';
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
   * 自定义样式
   */
  style?: React.CSSProperties;
}

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
  } = props;

  const [[year, month], setYearMonth] = useState(() => {
    return date
      ? [date.getFullYear(), date.getMonth()]
      : [defaultYear, defaultMonth];
  });
  const [viewModel, setViewModel] = useState<ViewModel>(ViewModel.dates);

  const renderDates = () => (
    <>
      <WeekTitleBar startOfWeek={startOfWeek} />
      <div className="sinoui-date-time-mobile-view__datesview">
        <DatesView year={year} month={month} />
      </div>
    </>
  );
  return (
    <DateTimeMobileViewWrapper
      style={style}
      className="sinoui-date-time-mobile-view"
    >
      <DateTimeMobileViewToolbar
        year={year}
        viewModel={viewModel}
        onViewModelChange={setViewModel}
      />
      <CalendarViewHeader
        year={year}
        month={month}
        onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
        viewModel={viewModel}
        onViewModelChange={setViewModel}
      />
      {renderDates()}
      <CalendarViewAction />
    </DateTimeMobileViewWrapper>
  );
}
