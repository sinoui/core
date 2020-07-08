import DateCellRect from '../DateCellRect';

function getMobileWidth(
  weekNo: number,
  firstDay: number,
  lastDay: number,
  dateContentWidth: number,
  isStart: boolean,
) {
  let width = `calc(${((lastDay - firstDay + 1) / 7) * 100}%)`;
  if (weekNo === 0) {
    width = '100%';
  }

  if (isStart) {
    width = `calc(${((lastDay - firstDay + 1) / 7) * 100}% - ${
      dateContentWidth / 2
    }px)`;
  }

  return width;
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
    : getMobileWidth(weekNo, firstDay, lastDay, dateCellContentWidth, isStart);
  const left = isPc
    ? `calc(${((firstDay - 1) / 7) * 100}% + ${dateCellRect.padding}px)`
    : `calc(${((firstDay - 1 + 1 / 2) / 7) * 100}% - ${
        dateCellContentWidth / 2
      }px + ${12}px)`;
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
        left: isStart ? left : 0,
        top,
      };
}
