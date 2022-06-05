import React, { useState, useMemo, useRef } from 'react';
import CalendarViewWrapper from '@sinoui/core/DatePicker/CalendarView/CalendarViewWrapper';
import YearSelectView from '@sinoui/core/DatePicker/YearSelectView';
import useIsPc from '@sinoui/core/DatePicker/useIsPc';
import CalendarViewAction from '@sinoui/core/DatePicker/CalendarView/CalendarViewAction';
import padStart from 'lodash/padStart';
import MonthSelectView from './MonthSelectView';
import ViewModel from './ViewModel';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewToolbar from './CalendarViewToolbar';
import { getDefaultYearMonth, getYearAndMonthByValue } from './utils';

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 指定选中日期。格式 YYYY-MM
   */
  value?: string;
  /**
   * 选中日期发生变化的回调函数
   */
  onChange?: (value?: string) => void;
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
  minDate?: string;
  /**
   * 指定最大日期。
   */
  maxDate?: string;

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
  /**
   * 是否是pc形态
   */
  isPc?: boolean;
}

/**
 * 日历视图
 */
export default React.forwardRef<HTMLDivElement, Props>(
  (
    {
      defaultYear,
      defaultMonth,
      value,
      onChange,
      minDate,
      maxDate,
      showButtons,
      onCancel,
      onOk,
      onClear,
      skipMonthsView: skipMonthsViewProp,
      title,
      isPc: isPcProp,
      ...rest
    },
    ref,
  ) => {
    const nativePc = useIsPc();
    const isPc = isPcProp ?? nativePc;
    const valueRef = useRef(value);
    const [[year, month], setYearMonth] = useState(() =>
      value
        ? getYearAndMonthByValue(value)
        : [
            defaultYear ?? new Date().getFullYear(),
            defaultMonth ?? new Date().getMonth(),
          ],
    );
    const [viewModel, setViewModel] = useState<ViewModel>(ViewModel.months);

    if (value !== valueRef.current && value) {
      const [newYear, newMonth] = value.split('-');
      setYearMonth([Number(newYear), Number(newMonth) - 1]);
      valueRef.current = value;
    }

    const handleYearSelect = (newYear: number) => {
      if (newYear !== year) {
        setYearMonth([newYear, month]);
      }
      setViewModel(ViewModel.months);
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
      if (onChange) {
        onChange(`${year}-${padStart(String(newMonth + 1), 2, '0')}`);
      }
    };

    const renderMonths = () => (
      <MonthSelectView
        selectedMonth={month}
        onMonthSelect={handleMonthSelect}
        className="sinoui-calendar-view__monthsview"
        isPc={isPc}
        year={year}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
      />
    );

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
          <CalendarViewToolbar
            title={title || '设置日期'}
            value={value ?? getDefaultYearMonth()}
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
        {viewModel === ViewModel.months && renderMonths()}
        {isShowButtons && (
          <CalendarViewAction
            onOk={onOk}
            onCancel={onCancel}
            onClear={onClear}
          />
        )}
      </CalendarViewWrapper>
    );
  },
);
