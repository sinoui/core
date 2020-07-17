import { PC_DATE_CELL_RECT } from '../constants';

/**
 * 获取周状态条高度
 */
export function getWeekStatusBarHeight() {
  const { height, padding } = PC_DATE_CELL_RECT;

  return height - 2 * padding;
}

/**
 * 获取周状态条的宽度
 *
 * @param range 区间
 
 */
export function getWeekStatusBarWidth(range: [number, number]) {
  const [start, end] = range;
  const { width, padding } = PC_DATE_CELL_RECT;
  const dateCellContentWidth = width - 2 * padding;
  const rangeLength = end - start;

  return `calc(${((rangeLength / 7) * 100).toFixed(
    4,
  )}% + ${dateCellContentWidth}px)`;
}

/**
 * 获取周状态条水平位置
 *
 * @param range 区间
 */
export function getWeekStatusBarLeft(firstDay: number) {
  return `calc(${((firstDay / 7) * 100).toFixed(4)}% + ${
    PC_DATE_CELL_RECT.padding
  }px)`;
}

/**
 * 获取周状态条垂直位置
 * @param weekNo 月份中的第几周
 */
export function getWeekStatusBarTop(weekNo: number) {
  const { height: cellHeight, padding: cellPadding } = PC_DATE_CELL_RECT;
  return cellHeight * weekNo + cellPadding;
}

/**
 * 获取周状态条的边框半径
 *
 */
export function getWeekStatusBarBorderRadius() {
  const { height: cellHeight, padding: cellPadding } = PC_DATE_CELL_RECT;
  return (cellHeight - 2 * cellPadding) / 2;
}

/**
 * 获取周状态条样式
 *
 * @param range 日期区间
 * @param weekNo 周在月份中的序号，从0开始
 */
export default function getWeekStatusBarStyle(
  range: [number, number],
  weekNo: number,
): React.CSSProperties {
  const borderRadius = getWeekStatusBarBorderRadius();
  return {
    width: getWeekStatusBarWidth(range),
    height: getWeekStatusBarHeight(),
    borderRadius,
    left: getWeekStatusBarLeft(range[0]),
    top: getWeekStatusBarTop(weekNo),
  };
}
