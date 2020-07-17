import getDayOfWeek from './getDayOfWeek';

/**
 * 获取指定日期属于当月的第几周。从0开始计数。
 *
 * @param date 日期
 * @param sundayIsStartDayOfWeek 指定星期是否从星期日开始。默认为false
 */
export default function getWeekNoOfMonth(
  date: Date,
  sundayIsStartDayOfWeek = false,
) {
  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = getDayOfWeek(firstDateOfMonth, sundayIsStartDayOfWeek);

  return Math.floor((firstDay + date.getDate() - 1) / 7);
}
