import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import { FixedSizeList } from 'react-window';
import memoize from 'memoize-one';
import {
  COUNTS_OF_YEAR,
  MONTH_FULL_TITLES,
} from '@sinoui/core/DatePicker/constants';
import formatDate from '@sinoui/core/DatePicker/formatDate';
import MobileDateRangeViewWrapper from './MobileDateRangeViewWrapper';
import MobileDateRangeViewToolBar from './MobileDateRangeViewToolBar';
import MobileDateRangeViewContent from './MobileDateRangeViewContent';
import MemoMonthItem from './MonthItem';

export interface Props {
  /**
   * 弹窗标题
   */
  title?: string;
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
   * 是否展示今天
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
   * 聚焦的输入框
   */
  focusedInput?: 'start' | 'end';
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose?: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string[]) => void;
}

/**
 * 生成年份列表
 *
 * @param startYear 开始年份
 * @param showYearsCount 年份个数
 */
export const genYears = (
  startYear: number = new Date().getFullYear() - 100,
  showYearsCount: number = COUNTS_OF_YEAR,
) => {
  const years: number[] = [];

  for (let i = 0; i < showYearsCount; i += 1) {
    years.push(startYear + i);
  }

  return years;
};

/**
 * 创建项目数据
 */
const createItemData = memoize(
  (startDate, endDate, showToday, minDate, maxDate, onDateClick) => ({
    years: genYears(),
    startDate,
    endDate,
    showToday,
    minDate,
    maxDate,
    onDateClick,
  }),
);

const MemoWeekTitleBar = React.memo(WeekTitleBar);

/**
 * 移动端日期区间选择视图
 * @param props
 */
export default function MobileDateRangeView(props: Props) {
  const {
    title,
    startDate,
    endDate,
    defaultYear,
    defaultMonth,
    showToday = true,
    minDate: min,
    maxDate,
    focusedInput,
    onRequestClose,
    onChange,
  } = props;

  const [selectedStart, setSelectedStart] = useState(startDate);
  const [selectedEnd, setSelectedEnd] = useState(endDate);
  const [focused, setFocused] = useState(focusedInput);

  const minDate = focused === 'end' ? selectedStart : min;

  const selectedNodeRef = useRef<FixedSizeList>(null);

  const currentYear = startDate
    ? startDate.getFullYear()
    : defaultYear ?? new Date().getFullYear();

  const currentMonth = startDate
    ? startDate.getMonth()
    : defaultMonth ?? new Date().getMonth();

  /**
   * 获取当前月索引位置
   */
  const getCurrentMonthIndex = () => {
    const yearIndex = genYears().findIndex((year) => year === currentYear);
    const monthIndex = MONTH_FULL_TITLES.findIndex(
      (month) => month === MONTH_FULL_TITLES[currentMonth],
    );
    return yearIndex * 12 + monthIndex;
  };
  const currentMonthIndex = getCurrentMonthIndex();

  useLayoutEffect(() => {
    if (selectedNodeRef.current) {
      selectedNodeRef.current.scrollToItem(currentMonthIndex, 'start');
    }
  }, [currentMonthIndex]);

  /**
   * 处理日期单元格点击事件
   */
  const handleDateClick = useCallback(
    (_: React.MouseEvent<HTMLElement>, date: Date) => {
      if (focused === 'start') {
        setSelectedStart(date);
        setFocused('end');
        if (selectedEnd && date.getTime() > selectedEnd.getTime()) {
          setSelectedEnd(undefined);
        }
      } else {
        setSelectedEnd(date);
      }
    },
    [focused, selectedEnd],
  );

  const onOk = () => {
    if (onChange) {
      onChange([
        formatDate(selectedStart) ?? '',
        formatDate(selectedEnd) ?? '',
      ]);
    }
    if (onRequestClose) {
      onRequestClose();
    }
  };

  const onClear = () => {
    setSelectedStart(undefined);
    setSelectedEnd(undefined);
    if (focused !== 'start') {
      setFocused('start');
    }
  };

  const itemData = createItemData(
    selectedStart,
    selectedEnd,
    showToday,
    minDate,
    maxDate,
    handleDateClick,
  );

  return (
    <MobileDateRangeViewWrapper className="sinoui-date-range-mobile-view">
      <MobileDateRangeViewToolBar
        title={title ?? '设置日期'}
        startDate={selectedStart}
        endDate={selectedEnd}
        onClose={onRequestClose}
        onOk={onOk}
        onClear={onClear}
        focused={focused}
        onFocusedChange={setFocused}
      />
      <MemoWeekTitleBar />
      <MobileDateRangeViewContent>
        <FixedSizeList
          className="sinoui-date-range-mobile-year"
          ref={selectedNodeRef}
          height={window.innerHeight - 176}
          itemCount={2400}
          itemSize={336}
          itemData={itemData}
          width="100%"
          overscanCount={0}
          initialScrollOffset={currentMonthIndex * 336}
        >
          {MemoMonthItem}
        </FixedSizeList>
      </MobileDateRangeViewContent>
    </MobileDateRangeViewWrapper>
  );
}
