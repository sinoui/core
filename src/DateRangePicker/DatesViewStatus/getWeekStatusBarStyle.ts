import DateCellRect from '../DateCellRect';
import getDayOfWeek from '../helpers/getDayOfWeek';

/**
 * 获取周状态条高度
 *
 * @param dateCellRect 日期单元格尺寸
 */
export function getWeekStatusBarHeight(dateCellRect: DateCellRect) {
  const { height, padding } = dateCellRect;

  return height - 2 * padding;
}

/**
 * 获取周状态条的宽度
 *
 * @param range 区间
 * @param dateCellRect 日期单元格尺寸
 */
export function getWeekStatusBarWidth(
  range: [Date, Date],
  dateCellRect: DateCellRect,
) {
  const [start, end] = range;
  const { width, padding } = dateCellRect;
  const dateCellContentWidth = width - 2 * padding;
  const rangeLength = end.getDate() - start.getDate();

  return `calc(${((rangeLength / 7) * 100).toFixed(
    4,
  )}% + ${dateCellContentWidth}px)`;
}

/**
 * 获取周状态条水平位置
 *
 * @param range 区间
 * @param dateCellRect 日期单元格尺寸
 */
export function getWeekStatusBarLeft(
  range: [Date, Date],
  dateCellRect: DateCellRect,
) {
  const firstDay = getDayOfWeek(range[0]);
  return `calc(${((firstDay / 7) * 100).toFixed(4)}% + ${
    dateCellRect.padding
  }px)`;
}

/**
 * 获取周状态条垂直位置
 *
 * @param weekNo 月份中的第几周
 * @param dateCellRect 日期单元格尺寸
 */
export function getWeekStatusBarTop(
  weekNo: number,
  dateCellRect: DateCellRect,
) {
  const { height: cellHeight, padding: cellPadding } = dateCellRect;
  return cellHeight * weekNo + cellPadding;
}

/**
 * 获取周状态条的边框半径
 *
 * @param dateCellRect 日期单元格尺寸
 */
export function getWeekStatusBarBorderRadius(dateCellRect: DateCellRect) {
  const { height: cellHeight, padding: cellPadding } = dateCellRect;
  return (cellHeight - 2 * cellPadding) / 2;
}

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
  // TODO: range 直接传递日期属于周几
  return {
    width: getWeekStatusBarWidth(range, dateCellRect),
    height: getWeekStatusBarHeight(dateCellRect),
    borderRadius: getWeekStatusBarBorderRadius(dateCellRect),
    left: getWeekStatusBarLeft(range, dateCellRect),
    top: getWeekStatusBarTop(weekNo, dateCellRect),
  };
}
