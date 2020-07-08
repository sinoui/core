import DateCellRect from '../DateCellRect';

/**
 * 获取周状态条样式
 *
 * @param range 日期区间
 * @param dateCellRect 日期单元格尺寸
 * @param weekNo 周在月份中的序号，从0开始
 */
export default function getWeekStatusBarStyle(
  range: [Date, Date],
  dateCellRect: DateCellRect,
  weekNo: number,
): React.CSSProperties {
  const [start, end] = range;
  const firstDay = start.getDay() === 0 ? 7 : start.getDay();
  const lastDay = end.getDay() === 0 ? 7 : end.getDay();
  const {
    width: cellWidth,
    height: cellHeight,
    padding: cellPadding,
  } = dateCellRect;
  const dateCellContentWidth = cellWidth - 2 * cellPadding;
  const dateCellContentHeight = cellHeight - 2 * cellPadding;

  const width = `calc(${
    ((lastDay - firstDay) / 7) * 100
  }% + ${dateCellContentWidth}px)`;
  const left = `calc(${((firstDay - 1) / 7) * 100}% + ${
    dateCellRect.padding
  }px)`;
  const top = cellHeight * weekNo + cellPadding;

  return {
    width,
    height: dateCellContentHeight,
    borderRadius: dateCellContentHeight / 2,
    left,
    top,
  };
}
