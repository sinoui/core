import React, { useMemo, useState } from 'react';

import SimpleMonthDatesView from '../DatesView/SimpleMonthDatesView';
import MonthSelectView from '../MonthSelectView';
import useIsPc from '../useIsPc';
import ViewModel from '../ViewModel';
import WeekTitleBar from '../WeekTitleBar';
import YearSelectView from '../YearSelectView';
import CalendarViewAction from './CalendarViewAction';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewToolbar from './CalendarViewToolbar';
import CalendarViewWrapper from './CalendarViewWrapper';
import DateText from './DateText';
import getMonthRange from './getMonthRange';

/**
 * 组件属性
 */
export interface Props {
  /**
   *
   */
  className?: string;
  /**
   *
   */
  style?: React.CSSProperties;
  /**
   * 指定选中日期。需要是`Date`类型的。如果需要从字符串转换成`Date`，则建议使用`useMemo`:
   * 
   * ```tsx
     const date = useMemo(() => new Date(Date.parse(dateStr)), [dateStr]);
   
     return <DatePicker value={date} />;
   * ```
   */
  value?: Date;
  /**
   * 选中日期发生变化的回调函数
   */
  onChange?: (value?: Date) => void;
  /**
   * 默认的年份
   */
  defaultYear?: number;
  /**
   * 默认的月份
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
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
  /**
   * 是否展示按钮组，PC端默认不显示，移动端默认显示
   */
  showButtons?: boolean;
  /**
   * 点击取消按钮的回调函数
   */
  onCancel?: (event: React.MouseEvent) => void;
  /**
   * 点击清除按钮的回调函数
   */
  onClear?: (event: React.MouseEvent) => void;
  /**
   * 点击确定按钮的回调函数
   */
  onOk?: (event: React.MouseEvent) => void;
  /**
   * 设置为`true`，则跳过月份选择。默认情况下，在桌面端不跳过，在移动端跳过。
   */
  skipMonthsView?: boolean;
  /**
   * 日历选择标题
   */
  title?: string;
  /**
   * 是否是pc形态
   */
  isPc?: boolean;
  /**
   * 日历开始的视图模型。默认为日期视图。
   */
  startViewModel: ViewModel.months | ViewModel.dates;
}

/**
 * 日历视图
 */
export default React.forwardRef<HTMLDivElement, Props>(function CalendarView(
  {
    defaultYear,
    defaultMonth,
    value,
    onChange,
    showToday = true,
    minDate,
    maxDate,
    startOfWeek,
    showButtons,
    onCancel,
    onOk,
    onClear,
    skipMonthsView: skipMonthsViewProp,
    title,
    isPc: isPcProp,
    startViewModel,
    ...rest
  },
  ref,
) {
  const nativePc = useIsPc();
  const isPc = isPcProp ?? nativePc;
  const [valueState, setValueState] = useState(value);
  const [[year, month], setYearMonth] = useState(() =>
    value
      ? [value.getFullYear(), value.getMonth()]
      : [
          defaultYear ?? new Date().getFullYear(),
          defaultMonth ?? new Date().getMonth(),
        ],
  );
  const [viewModel, setViewModel] = useState<ViewModel>(startViewModel);

  const skipMonthsView = skipMonthsViewProp ?? !isPc;

  if (
    value !== valueState &&
    value &&
    (!valueState ||
      value.getFullYear() !== valueState.getFullYear() ||
      value.getMonth() !== valueState.getMonth())
  ) {
    setYearMonth([value.getFullYear(), value.getMonth()]);
    setValueState(value);
  }

  const handleDateClick = (_: React.MouseEvent<HTMLElement>, newDate: Date) => {
    if (onChange) {
      onChange(newDate);
    }
  };

  const renderDates = () => (
    <>
      <WeekTitleBar startOfWeek={startOfWeek} isPc={isPc} />
      <div className="sinoui-calendar-view__datesview">
        <SimpleMonthDatesView
          year={year}
          month={month}
          minDate={minDate}
          maxDate={maxDate}
          showToday={showToday}
          value={value}
          isPc={isPc}
          showNextMonthDates={isPc}
          onDateClick={handleDateClick}
          startOfWeek={startOfWeek}
        />
      </div>
    </>
  );

  const handleYearSelect = (newYear: number) => {
    if (newYear !== year) {
      setYearMonth([newYear, month]);
    }
    setViewModel(
      skipMonthsView && ViewModel.months !== startViewModel
        ? ViewModel.dates
        : ViewModel.months,
    );
  };

  const renderYears = () => (
    <YearSelectView
      selectedYear={year}
      onYearSelect={handleYearSelect}
      className="sinoui-calendar-view__yearsview"
      isPc={isPc}
    />
  );

  const handleMonthSelect = (newMonth: number) => {
    if (newMonth !== month) {
      setYearMonth([year, newMonth]);
    }

    if (startViewModel === ViewModel.dates) {
      setViewModel(ViewModel.dates);
    } else if (onChange) {
      onChange(new Date(year, newMonth, 1));
    }
  };

  const renderMonths = () => {
    const selectedMonth =
      startViewModel === ViewModel.dates
        ? month
        : year === value?.getFullYear()
        ? month
        : -1;
    const [minMonth, maxMonth] =
      startViewModel === ViewModel.dates
        ? [0, 11]
        : getMonthRange(year, minDate, maxDate);
    return (
      <MonthSelectView
        selectedMonth={selectedMonth}
        onMonthSelect={handleMonthSelect}
        className="sinoui-calendar-view__monthsview"
        isPc={isPc}
        minMonth={minMonth}
        maxMonth={maxMonth}
      />
    );
  };

  const isShowButtons = useMemo(
    () => showButtons ?? !isPc,
    [isPc, showButtons],
  );

  return (
    <CalendarViewWrapper
      {...rest}
      className="sinoui-calendar-view"
      ref={ref}
      $isPc={isPc}
    >
      {!isPc && (
        <CalendarViewToolbar title={title || '设置日期'}>
          <DateText date={value} startViewModel={startViewModel} />
        </CalendarViewToolbar>
      )}
      <CalendarViewHeader
        year={year}
        month={month}
        onChange={(newYar, newMonth) => setYearMonth([newYar, newMonth])}
        onViewModelChange={setViewModel}
        viewModel={viewModel}
        startViewModel={startViewModel}
      />
      {viewModel === ViewModel.years && renderYears()}
      {viewModel === ViewModel.dates && renderDates()}
      {viewModel === ViewModel.months && renderMonths()}
      {isShowButtons && (
        <CalendarViewAction onOk={onOk} onCancel={onCancel} onClear={onClear} />
      )}
    </CalendarViewWrapper>
  );
});
