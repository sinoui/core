/**
 * 是否是同一个月份
 * @param date
 * @param year
 * @param month
 */
export default function isSameMonth(
  date: Date | undefined,
  year: number,
  month: number,
): date is Date {
  return !!date && date.getFullYear() === year && date.getMonth() === month;
}
