/**
 * 获取空心的日期区间
 *
 * @param focusedDateView 焦点日期视图
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param currentDate 当前鼠标所在的日期
 */
export default function getOutlinedDateRange(
  focusedDateView: 'start' | 'end',
  startDate?: Date,
  endDate?: Date,
  currentDate?: Date,
): [Date, Date] | undefined {
  if (!currentDate) {
    return undefined;
  }

  if (focusedDateView === 'start') {
    if (endDate && !startDate && currentDate < endDate) {
      return [currentDate, endDate];
    }

    if (startDate && endDate && currentDate < startDate) {
      return [currentDate, startDate];
    }
  }

  if (focusedDateView === 'end') {
    if (startDate && endDate && currentDate > endDate) {
      return [endDate, currentDate];
    }
    if (startDate && !endDate && currentDate > startDate) {
      return [startDate, currentDate];
    }
  }

  return undefined;
}
