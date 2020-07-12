import React, { useMemo } from 'react';
import bemClassNames from '@sinoui/core/utils/bemClassNames';
import formatDate from '@sinoui/core/DatePicker/formatDate';
import DateCellRect from '../DateCellRect';
import getWeekStatusBarStyle from './getWeekStatusBarStyle';
import WeekStatusBarWrapper from './WeekStatusBarWrapper';
import getMobileWeekStatusBarStyle from './getMobileWeekStatusBarStyle';

interface Props {
  /**
   * 设置为`true`，则表示空心。
   */
  outlined?: boolean;
  /**
   * 日期单元格尺寸
   */
  dateCellRect?: DateCellRect;
  /**
   * 周在月份中的序号，从0开始。
   */
  weekNo: number;
  /**
   * 有效状态区间的开始日期
   */
  startDate: Date;
  /**
   * 有效状态区间的结束日期
   */
  endDate: Date;
  style?: React.CSSProperties;
  /**
   * 是否是pc设备，默认为true
   */
  isPc?: boolean;
  /**
   * 是否是开始时间
   */
  isStart?: boolean;
  /**
   * 是否是结束时间
   */
  isEnd?: boolean;
  /**
   * 是否是最后一周
   */
  isLastWeek?: boolean;
}

const defaultDateCellRect: DateCellRect = {
  width: 32,
  height: 32,
  padding: 2,
};

/**
 * 周状态条
 */
export default function WeekStatusBar({
  outlined,
  dateCellRect = defaultDateCellRect,
  weekNo,
  startDate,
  endDate,
  isPc = true,
  isStart = false,
  isEnd = false,
  isLastWeek = false,
  ...rest
}: Props) {
  const weekBarStyle = useMemo(
    () =>
      isPc
        ? getWeekStatusBarStyle([startDate, endDate], dateCellRect, weekNo)
        : getMobileWeekStatusBarStyle(
            [startDate, endDate],
            dateCellRect,
            weekNo,
            isStart,
            isEnd,
            isLastWeek,
          ),
    [
      dateCellRect,
      endDate,
      isEnd,
      isLastWeek,
      isPc,
      isStart,
      startDate,
      weekNo,
    ],
  );

  return (
    <WeekStatusBarWrapper
      outlined={outlined}
      className={bemClassNames('sinoui-date-range-picker__week-status-bar', {
        outlined,
        raised: !outlined,
      })}
      data-week-no={weekNo}
      data-start-date={formatDate(startDate)}
      data-end-date={formatDate(endDate)}
      style={weekBarStyle}
      {...rest}
    />
  );
}
