import { MOBILE_DATE_CELL_RECT } from '../constants';

/**
 * 获取周状态条高度
 */
export function getWeekStatusBarHeight() {
  const { height, padding } = MOBILE_DATE_CELL_RECT;

  return height - 2 * padding;
}

/**
 * 获取周状态条垂直位置
 *
 * @param weekNo 月份中的第几周
 */
export function getWeekStatusBarTop(weekNo: number) {
  const { height: cellHeight, padding: cellPadding } = MOBILE_DATE_CELL_RECT;
  return cellHeight * (weekNo + 1) + cellPadding;
}

/**
 * 获取周状态条的边框半径
 */
export function getWeekStatusBarBorderRadius() {
  const { height: cellHeight, padding: cellPadding } = MOBILE_DATE_CELL_RECT;
  return (cellHeight - 2 * cellPadding) / 2;
}

/**
 * 获取移动端状态条宽度
 * @param range 区间
 * @param weekNo 周在月份中的序号，从0开始
 * @param isStart 是否包含开始日期
 * @param isEnd 是否包含结束日期
 */
export function getMobileWeekStatusBarWidth(
  range: [Date, Date],
  weekNo: number,
  isStart?: boolean,
  isEnd?: boolean,
  isLastWeek?: boolean,
) {
  const [start, end] = range;
  const { width, padding } = MOBILE_DATE_CELL_RECT;
  const dateCellContentWidth = width - 2 * padding;
  const rangeLength = end.getDate() - start.getDate();
  const firstDay = start.getDay() === 0 ? 7 : start.getDay();
  const lastDay = end.getDay() === 0 ? 7 : end.getDay();
  let statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength + 1} + ${
    rangeLength < 6 ? 12 : 24
  }px)`;

  if (isStart && isEnd) {
    statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength} + ${dateCellContentWidth}px)`;
  } else if (isEnd && weekNo === 0) {
    statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength + 1 / 2} + ${
      dateCellContentWidth / 2
    }px + ${firstDay === 1 ? 12 : 0}px)`;
  } else if (isStart && isLastWeek) {
    statusBarWidth = `calc((100% - 24px)/7 * ${rangeLength + 1 / 2} + ${
      dateCellContentWidth / 2
    }px + ${lastDay === 7 ? 12 : 0}px)`;
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
 * @param isStart 是否包含开始日期
 * @param isEnd 是否包含结束日期
 */
export function getMobileWeekStatusBarLeft(
  range: [Date, Date],
  weekNo: number,
  isStart?: boolean,
) {
  const [start] = range;
  const { width, padding } = MOBILE_DATE_CELL_RECT;
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
 * @param weekNo 周在月份中的序号，从0开始
 * @param isPc 是否是pc设备
 * @param isStart 是否是开始日期所在的周
 * @param isEnd 是否是结束日期所在的周
 * @param isLastWeek 是否是每个月的最后一周
 */
export default function getMobileWeekStatusBarStyle(
  range: [Date, Date],
  weekNo: number,
  isStart?: boolean,
  isEnd?: boolean,
  isLastWeek?: boolean,
): React.CSSProperties {
  const borderRadius = getWeekStatusBarBorderRadius();

  return {
    width: getMobileWeekStatusBarWidth(
      range,
      weekNo,
      isStart,
      isEnd,
      isLastWeek,
    ),
    height: getWeekStatusBarHeight(),
    borderTopLeftRadius: isStart ? borderRadius : 0,
    borderBottomLeftRadius: isStart ? borderRadius : 0,
    borderTopRightRadius: isEnd ? borderRadius : 0,
    borderBottomRightRadius: isEnd ? borderRadius : 0,
    left: getMobileWeekStatusBarLeft(range, weekNo, isStart),
    top: getWeekStatusBarTop(weekNo),
  };
}
