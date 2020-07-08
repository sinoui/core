import React, { useMemo } from 'react';
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
  /**
   * 指定自定义样式
   */
  style?: React.CSSProperties;
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
}: Props) {
  const weekBarStyle = useMemo(
    () => getWeekStatusBarStyle([startDate, endDate], dateCellRect, weekNo),
    [dateCellRect, endDate, startDate, weekNo],
  );

  return <WeekStatusBarWrapper outlined={outlined} style={weekBarStyle} />;
}
