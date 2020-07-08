import React, { useLayoutEffect, useRef, useMemo } from 'react';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import { FixedSizeList } from 'react-window';
import {
  COUNTS_OF_YEAR,
  MONTH_FULL_TITLES,
} from '@sinoui/core/DatePicker/constants';
import styled from 'styled-components';
import MobileDateRangeViewWrapper from './MobileDateRangeViewWrapper';
import MobileDateRangeViewToolBar from './MobileDateRangeViewToolBar';
import MobileDateRangeViewContent from './MobileDateRangeViewContent';
import isSameMonth from '../helpers/isSameMonth';

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

const YearItem = styled.div`
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding-left: 12px;
`;

function MonthItem({ index, style, data }: any) {
  const { years, startDate, endDate } = data;
  const month = MONTH_FULL_TITLES[index % 12];
  const year = years[Math.floor(index / 12)];

  const selectedDates = useMemo(() => {
    return [startDate, endDate]
      .map((date) =>
        isSameMonth(date, year, index % 12) ? date.getDate() : undefined,
      )
      .filter(Boolean);
  }, [endDate, index, startDate, year]);

  return (
    <div key={`${year}_${month}`} style={style}>
      <YearItem>
        {year}年{month}
      </YearItem>
      <DatesView
        year={year}
        month={index % 12}
        selectedDates={selectedDates as number[]}
      />
    </div>
  );
}

/**
 * 移动端日期区间选择视图
 * @param props
 */
export default function MobileDateRangeView(props: Props) {
  const { title, startDate, endDate, defaultYear, defaultMonth } = props;
  const selectedNodeRef = useRef<FixedSizeList>(null);
  const years = genYears();

  const currentYear = startDate
    ? startDate.getFullYear()
    : defaultYear ?? new Date().getFullYear();
  const currentMonth = startDate
    ? startDate.getMonth()
    : defaultMonth ?? new Date().getMonth();

  useLayoutEffect(() => {
    const yearIndex = years.findIndex((year) => year === currentYear);
    const monthIndex = MONTH_FULL_TITLES.findIndex(
      (month) => month === MONTH_FULL_TITLES[currentMonth],
    );
    const index = yearIndex * 12 + monthIndex;
    if (selectedNodeRef.current) {
      selectedNodeRef.current.scrollToItem(index, 'start');
    }
  }, [currentMonth, currentYear, years]);

  const renderDates = () => (
    <>
      <WeekTitleBar />
      <MobileDateRangeViewContent>
        <FixedSizeList
          className="sinoui-date-range-mobile-year"
          ref={selectedNodeRef}
          height={window.innerHeight - 176}
          itemCount={2400}
          itemSize={336}
          itemData={{ years, startDate, endDate }}
          width="100%"
        >
          {MonthItem}
        </FixedSizeList>
      </MobileDateRangeViewContent>
    </>
  );

  return (
    <MobileDateRangeViewWrapper>
      <MobileDateRangeViewToolBar
        title={title ?? '设置日期'}
        startDate={startDate}
        endDate={endDate}
      />
      {renderDates()}
    </MobileDateRangeViewWrapper>
  );
}
