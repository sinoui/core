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
   * 有效状态的日期区间
   */
  range: [Date, Date];
  /**
   * 指定自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 是否是pc设备，默认为true
   */
  isPc?: boolean;
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
  range,
  isPc = true,
}: Props) {
  const weekBarStyle = useMemo(
    () => getWeekStatusBarStyle(range, dateCellRect, weekNo, isPc),
    [dateCellRect, isPc, range, weekNo],
  );

  return (
    <WeekStatusBarWrapper
      className="sinoui-week-status-bar"
      outlined={outlined}
      style={weekBarStyle}
    />
  );
}
