/**
 * 获取指定日期属于星期几
 *
 * @param date
 * @param sundayIsStartDayOfWeek
 */
export default function getDayOfWeek(
  date: Date,
  sundayIsStartDayOfWeek = false,
) {
  const day = date.getDay();

  if (sundayIsStartDayOfWeek) {
    return day;
  }

  return day === 0 ? 6 : day - 1;
}
