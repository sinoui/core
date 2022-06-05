/**
 * 获取指定年份的有效月份范围
 *
 * @param year 指定年份
 * @param minDate 最小日期
 * @param maxDate 最大日期
 */
export default function getMonthRange(
  year: number,
  minDate?: Date,
  maxDate?: Date,
): [number, number] {
  let min = 0;
  let max = 11;

  if (minDate) {
    if (minDate.getFullYear() === year) {
      min = minDate.getMonth();
    } else if (minDate.getFullYear() > year) {
      min = 12;
    }
  }

  if (maxDate) {
    if (maxDate.getFullYear() === year) {
      max = maxDate.getMonth();
    } else if (maxDate.getFullYear() < year) {
      max = -1;
    }
  }

  return [min, max];
}
