/**
 * 获取指定月份的天数
 *
 * @param year 年
 * @param month 月
 */
export default function getDatesOfMonth(year: number, month: number) {
  return new Date(
    new Date(year, month + 1, 1).getTime() - 1 * 24 * 3600 * 1000,
  ).getDate();
}
