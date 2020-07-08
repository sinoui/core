/**
 * 是否大于指定日期
 * @param value
 * @param year
 * @param month
 * @param date
 */
export default function isGreaterThen(
  value: Date,
  year: number,
  month: number,
  date: number,
) {
  return (
    new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      0,
      0,
      0,
    ).getTime() > new Date(year, month, date, 0, 0, 0).getTime()
  );
}
