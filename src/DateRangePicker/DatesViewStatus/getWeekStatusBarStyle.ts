import DateCellRect from '../DateCellRect';

/**
 * 获取移动端状态条宽度
 * @param firstDay
 * @param lastDay
 * @param dateContentWidth
 * @param isStart
 * @param isEnd
 */
function getMobileWeekStatusBarWidth(
  firstDay: number,
  lastDay: number,
  dateContentWidth: number,
  isStart: boolean,
  isEnd: boolean,
) {
  let width = `calc((100% - 24px)/${7} * ${lastDay - firstDay + 1} + 24px)`;

  if (isStart) {
    width = `calc((100% - 24px)/${7} * ${lastDay - firstDay + 1} + 24px - ${
      dateContentWidth / 2
    }px + 2px)`;
  }

  if (isEnd) {
    width = `calc((100% - 24px)/${7} * ${lastDay - firstDay + 1} + 8px)`;
  }

  return width;
}

/**
 * 获取移动端状态条左侧定位
 * @param weekNo
 * @param firstDay
 * @param cellPadding
 * @param isStart
 */
function getMobileWeekStatusBarLeft(
  weekNo: number,
  firstDay: number,
  cellPadding: number,
  isStart: boolean,
) {
  let left = `calc((100% - 24px)/${7} * ${firstDay - 1 / 2} - ${
    cellPadding * 2
  }px)`;

  if (!isStart && weekNo !== 0) {
    left = '0px';
  }

  if (weekNo === 0) {
    left = `calc((100% - 24px)/${7} * ${firstDay - 1 / 2} - 26px)`;
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
  isStart: boolean,
  isEnd: boolean,
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

  const width = isPc
    ? `calc(${((lastDay - firstDay) / 7) * 100}% + ${dateCellContentWidth}px)`
    : getMobileWeekStatusBarWidth(
        firstDay,
        lastDay,
        dateCellContentWidth,
        isStart,
        isEnd,
      );
  const left = isPc
    ? `calc(${((firstDay - 1) / 7) * 100}% + ${dateCellRect.padding}px)`
    : getMobileWeekStatusBarLeft(weekNo, firstDay, cellPadding, isStart);
  const top = cellHeight * (isPc ? weekNo : weekNo + 1) + cellPadding;

  return isPc
    ? {
        width,
        height: dateCellContentHeight,
        borderRadius: dateCellContentHeight / 2,
        left,
        top,
      }
    : {
        width,
        height: dateCellContentHeight,
        borderTopLeftRadius: isStart ? dateCellContentHeight / 2 : 0,
        borderBottomLeftRadius: isStart ? dateCellContentHeight / 2 : 0,
        borderTopRightRadius: isEnd ? dateCellContentHeight / 2 : 0,
        borderBottomRightRadius: isEnd ? dateCellContentHeight / 2 : 0,
        left,
        top,
      };
}
