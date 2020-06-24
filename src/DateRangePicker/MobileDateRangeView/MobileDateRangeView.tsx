import React, { useLayoutEffect, useRef } from 'react';
import CalendarViewAction from '@sinoui/core/DatePicker/CalendarView/CalendarViewAction';
import WeekTitleBar from '@sinoui/core/DatePicker/WeekTitleBar';
import DatesView from '@sinoui/core/DatePicker/DatesView';
import scrollIntoView from 'scroll-into-view-if-needed';
import {
  COUNTS_OF_YEAR,
  MONTH_FULL_TITLES,
} from '@sinoui/core/DatePicker/constants';
import MobileDateRangeViewWrapper from './MobileDateRangeViewWrapper';
import MobileDateRangeViewToolBar from './MobileDateRangeViewToolBar';
import MobileDateRangeViewContent from './MobileDateRangeViewContent';

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

/**
 * 移动端日期区间选择视图
 * @param props
 */
export default function MobileDateRangeView(props: Props) {
  const { title, startDate, endDate, defaultYear, defaultMonth } = props;
  const selectedNodeRef = useRef<HTMLDivElement>(null);
  // const years = genYears();

  const currentYear = startDate
    ? startDate.getFullYear()
    : defaultYear ?? new Date().getFullYear();
  const currentMonth = startDate
    ? startDate.getMonth()
    : defaultMonth ?? new Date().getMonth();

  useLayoutEffect(() => {
    const selectedYearNode = selectedNodeRef.current;
    if (selectedYearNode) {
      scrollIntoView(selectedYearNode, {
        block: 'center',
        inline: 'center',
      });
    }
  }, []);

  const renderDates = () => (
    <>
      <WeekTitleBar />
      <MobileDateRangeViewContent>
        {[2020].map((year) => {
          return MONTH_FULL_TITLES.map((month, index) => (
            <div
              key={`${year}_${month}`}
              ref={
                currentYear === year && currentMonth === index
                  ? selectedNodeRef
                  : null
              }
            >
              <div>
                {year}年{month}
              </div>
              <DatesView year={year} month={index} />
            </div>
          ));
        })}
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
      <CalendarViewAction />
    </MobileDateRangeViewWrapper>
  );
}
