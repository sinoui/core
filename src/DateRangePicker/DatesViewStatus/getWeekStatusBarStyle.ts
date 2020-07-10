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
 * @param isPc 是否是PC设备
 */
export function getWeekStatusBarTop(
  weekNo: number,
  dateCellRect: DateCellRect,
  isPc?: boolean,
) {
  const { height: cellHeight, padding: cellPadding } = dateCellRect;
  return cellHeight * (isPc ? weekNo : weekNo + 1) + cellPadding;
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
 * 获取移动端状态条宽度
 * @param range 区间
 * @param dateCellRect 日期单元格尺寸
 * @param weekNo 周在月份中的序号，从0开始
 * @param isStart 是否包含开始日期
 * @param isEnd 是否包含结束日期
 */
function getMobileWeekStatusBarWidth(
  range: [Date, Date],
  dateCellRect: DateCellRect,
  weekNo: number,
  isStart?: boolean,
  isEnd?: boolean,
) {
  const [start, end] = range;
  const { width, padding } = dateCellRect;
  const dateCellContentWidth = width - 2 * padding;
  const rangeLength = end.getDate() - start.getDate();
  let statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength + 1} + ${
    rangeLength < 6 ? 12 : 24
  }px)`;

  if (isStart && isEnd) {
    statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength} + ${dateCellContentWidth}px)`;
  } else if (isEnd && weekNo === 0) {
    statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength + 1 / 2} + ${
      dateCellContentWidth / 2
    }px)`;
  } else if (isStart || isEnd) {
    statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength + 1 / 2} + 12px + ${
      dateCellContentWidth / 2
    }px)`;
  }

  return statusBarWidth;
}

/**
 * 获取移动端状态条左侧定位
 * @param range 区间
 * @param weekNo 周在月份中的序号，从0开始
 * @param dateCellRect 日期单元格的尺寸
 * @param isStart 是否包含开始日期
 * @param isEnd 是否包含结束日期
 */
function getMobileWeekStatusBarLeft(
  range: [Date, Date],
  weekNo: number,
  dateCellRect: DateCellRect,
  isStart?: boolean,
) {
  const [start] = range;
  const { width, padding } = dateCellRect;
  const firstDay = start.getDay() === 0 ? 7 : start.getDay();
  const dateCellContentWidth = width - 2 * padding;

  let left = `calc((100% - 24px)/7 * ${firstDay - 1 / 2} - ${
    dateCellContentWidth / 2
  }px + 12px)`;

  if (!isStart) {
    if (weekNo === 0) {
      left = `calc((100% - 24px)/7 * ${firstDay - 1} + ${
        firstDay === 1 ? 0 : 12
      }px)`;
    } else {
      left = '0px';
    }
  }

  return left;
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
  isPc: boolean,
  isStart?: boolean,
  isEnd?: boolean,
): React.CSSProperties {
  // TODO: range 直接传递日期属于周几

  const borderRadius = getWeekStatusBarBorderRadius(dateCellRect);
  return isPc
    ? {
        width: getWeekStatusBarWidth(range, dateCellRect),
        height: getWeekStatusBarHeight(dateCellRect),
        borderRadius,
        left: getWeekStatusBarLeft(range, dateCellRect),
        top: getWeekStatusBarTop(weekNo, dateCellRect, true),
      }
    : {
        width: getMobileWeekStatusBarWidth(
          range,
          dateCellRect,
          weekNo,
          isStart,
          isEnd,
        ),
        height: getWeekStatusBarHeight(dateCellRect),
        borderTopLeftRadius: isStart ? borderRadius : 0,
        borderBottomLeftRadius: isStart ? borderRadius : 0,
        borderTopRightRadius: isEnd ? borderRadius : 0,
        borderBottomRightRadius: isEnd ? borderRadius : 0,
        left: getMobileWeekStatusBarLeft(range, weekNo, dateCellRect, isStart),
        top: getWeekStatusBarTop(weekNo, dateCellRect, false),
      };
}
