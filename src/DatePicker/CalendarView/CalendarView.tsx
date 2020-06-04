import React, { useState } from 'react';
import CalendarViewHeader from './CalendarViewHeader';
import WeekTitleBar from '../WeekTitleBar';
import DatesView from '../DatesView';
import CalendarViewWrapper from './CalendarViewWrapper';
import YearSelectView from '../YearSelectView';
import ViewModel from '../ViewModel';
import useIsPc from '../useIsPc';
import MonthSelectView from '../MonthSelectView';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 默认的年份
   */
  defaultYear?: number;
  /**
   * 默认的月份
   */
  defaultMonth?: number;
}

/**
 * 日历视图
 */
export default function CalendarView({
  defaultYear,
  defaultMonth,
  ...rest
}: Props) {
  const isPc = useIsPc();
  const [[year, month], setYearMonth] = useState(() => [
    defaultYear ?? new Date().getFullYear(),
    defaultMonth ?? new Date().getMonth(),
  ]);
  const [viewModel, setViewModel] = useState<ViewModel>(ViewModel.dates);

  const renderDates = () => (
    <>
      <WeekTitleBar />
      <div className="sinoui-calendar-view__datesview">
        <DatesView year={year} month={month} showNextMonthDates={isPc} />
      </div>
    </>
  );

  const handleYearSelect = (newYear: number) => {
    if (newYear !== year) {
      setYearMonth([newYear, month]);
    }
    setViewModel(isPc ? ViewModel.months : ViewModel.dates);
  };

  const renderYears = () => (
    <YearSelectView selectedYear={year} onYearSelect={handleYearSelect} />
  );

  const handleMonthSelect = (newMonth: number) => {
    if (newMonth !== month) {
      setYearMonth([year, newMonth]);
    }
    setViewModel(ViewModel.dates);
  };

  const renderMonths = () => (
    <MonthSelectView selectedMonth={month} onMonthSelect={handleMonthSelect} />
  );

  return (
    <CalendarViewWrapper {...rest}>
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
    </CalendarViewWrapper>
  );
}
