import React, { useMemo } from 'react';
import bemClassNames from '@sinoui/core/utils/bemClassNames';
import formatDate from '@sinoui/core/DatePicker/formatDate';
import DateCellRect from '../DateCellRect';
import getWeekStatusBarStyle from './getWeekStatusBarStyle';
import WeekStatusBarWrapper from './WeekStatusBarWrapper';

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
  ...rest
}: Props) {
  const weekBarStyle = useMemo(
    () => getWeekStatusBarStyle([startDate, endDate], dateCellRect, weekNo),
    [dateCellRect, endDate, startDate, weekNo],
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
