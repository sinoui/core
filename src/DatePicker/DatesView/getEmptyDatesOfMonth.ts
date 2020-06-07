/**
 * 获取指定月的空日期数
 *
 * @param year 年份
 * @param month 月份
 * @param startOfWeek 星期开始位置
 */
export default function getEmptyDatesOfMonth(
  year: number,
  month: number,
  startOfWeek: 0 | 1,
) {
  const firstDay = new Date(year, month, 1).getDay();
  if (startOfWeek === 0) {
    return firstDay;
  }
  return firstDay === 0 ? 6 : firstDay - 1;
}
