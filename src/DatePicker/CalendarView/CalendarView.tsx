import React, { useState, useMemo } from 'react';
import CalendarViewHeader from './CalendarViewHeader';
import WeekTitleBar from '../WeekTitleBar';
import DatesView from '../DatesView';
import CalendarViewWrapper from './CalendarViewWrapper';
import YearSelectView from '../YearSelectView';
import ViewModel from '../ViewModel';
import useIsPc from '../useIsPc';
import MonthSelectView from '../MonthSelectView';
import getDatesOfMonth from '../DatesView/getDatesOfMonth';
import CalendarViewAction from './CalendarViewAction';
import CalendarViewToolbar from './CalendarViewToolbar';

interface Props {
  className?: string;
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
  onChange?: (value: Date) => void;
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
  /*
   * 设置为`true`，则跳过月份选择。默认情况下，在桌面端不跳过，在移动端跳过。
   */
  skipMonthsView?: boolean;
  /**
   * 日历选择标题
   */
  title?: string;
}

function isSameMonth(
  date: Date | undefined,
  year: number,
  month: number,
): date is Date {
  return !!date && date.getFullYear() === year && date.getMonth() === month;
}

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
 * 日历视图
 */
export default function CalendarView({
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
  ...rest
}: Props) {
  const isPc = useIsPc();
  const [valueState, setValueState] = useState(value);
  const [[year, month], setYearMonth] = useState(() => {
    return value
      ? [value.getFullYear(), value.getMonth()]
      : [
          defaultYear ?? new Date().getFullYear(),
          defaultMonth ?? new Date().getMonth(),
        ];
  });
  const [viewModel, setViewModel] = useState<ViewModel>(ViewModel.dates);
  const selectedDates = useMemo(() => {
    return isSameMonth(value, year, month) ? [value.getDate()] : undefined;
  }, [month, value, year]);
  const outlinedDate =
    showToday && isSameMonth(new Date(), year, month)
      ? new Date().getDate()
      : undefined;
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
      <WeekTitleBar startOfWeek={startOfWeek} />
      <div className="sinoui-calendar-view__datesview">
        <DatesView
          year={year}
          month={month}
          showNextMonthDates={isPc}
          selectedDates={selectedDates}
          onDateClick={handleDateClick}
          outlinedDate={outlinedDate}
          disabledDates={getDisabledDates(year, month, minDate, maxDate)}
          startOfWeek={startOfWeek}
        />
      </div>
    </>
  );

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
      className="sinoui-calendar-view__yearsview"
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
      className="sinoui-calendar-view__monthsview"
    />
  );

  const isShowButtons = useMemo(() => showButtons ?? !isPc, [
    isPc,
    showButtons,
  ]);

  return (
    <CalendarViewWrapper {...rest}>
      {!isPc && (
        <CalendarViewToolbar
          title={title || '设置日期'}
          value={value ?? new Date()}
        />
      )}
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
      {isShowButtons && (
        <CalendarViewAction onOk={onOk} onCancel={onCancel} onClear={onClear} />
      )}
    </CalendarViewWrapper>
  );
}
