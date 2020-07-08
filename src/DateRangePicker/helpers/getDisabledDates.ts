import getDatesOfMonth from '@sinoui/core/DatePicker/DatesView/getDatesOfMonth';
import isGreaterThen from './isGreaterThen';

/**
 * 获取不可用的日期
 * @param year
 * @param month
 * @param minDate
 * @param maxDate
 */
export default function getDisabledDates(
  year: number,
  month: number,
  minDate?: Date,
  maxDate?: Date,
) {
  const dates = getDatesOfMonth(year, month);
  const disabledDates: number[] = [];

  for (let i = 0; i < dates; i += 1) {
    if (
      (minDate && isGreaterThen(minDate, year, month, i + 1)) ||
      (maxDate && !isGreaterThen(maxDate, year, month, i + 1))
    ) {
      disabledDates.push(i + 1);
    }
  }

  return disabledDates.length !== 0 ? disabledDates : undefined;
}
