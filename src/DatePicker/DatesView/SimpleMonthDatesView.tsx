import React, { useMemo } from 'react';
import mem from '@sinoui/core/utils/mem';
import type { Props as DatesViewProps } from './DatesView';
import DatesView from './DatesView';
import getDatesOfMonth from './getDatesOfMonth';

interface Props extends DatesViewProps {
  /**
   * 最小日期
   */
  minDate?: Date;
  /**
   * 最大日期
   */
  maxDate?: Date;
  /**
   * 是否展示今天
   */
  showToday?: boolean;
  /**
   * 指定的选中日期
   */
  value?: Date | (Date | undefined)[];
  /**
   * 指定年份
   */
  year: number;
  /**
   * 指定月份
   */
  month: number;
}

/**
 * 判断是否是同一月份
 * @param date 日期
 * @param year 年
 * @param month 月
 */
function isSameMonth(
  date: Date | undefined,
  year: number,
  month: number,
): date is Date {
  return !!date && date.getFullYear() === year && date.getMonth() === month;
}

function isGreaterThen(value: Date, year: number, month: number, date: number) {
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

/**
 * 获取不可用日期
 * @param year 年
 * @param month 月
 * @param minDate 最小日期
 * @param maxDate 最大日期
 */
export function getDisabledDates(
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

/**
 * 获取选中日期
 * @param value 指定选中日期
 * @param year 年份
 * @param month 月份
 */
function getSelectedDates(
  value: Date | undefined,
  year: number,
  month: number,
) {
  return isSameMonth(value, year, month) ? [value.getDate()] : undefined;
}

/**
 * 缓存选中的日期
 */
const memSelectedDates = mem(
  (items: number[]) => items,
  (items) => items.join('_'),
);

export default function SimpleMonthDatesView(props: Props) {
  const {
    minDate,
    maxDate,
    showToday = true,
    year,
    month,
    value,
    ...rest
  } = props;

  const selectedDates = useMemo(() => {
    return Array.isArray(value)
      ? memSelectedDates(
          [value[0], value[1]]
            .map((date) =>
              isSameMonth(date, year, month) ? date.getDate() : undefined,
            )
            .filter(Boolean) as number[],
        )
      : getSelectedDates(value, year, month);
  }, [month, value, year]);

  const outlinedDate =
    showToday && isSameMonth(new Date(), year, month)
      ? new Date().getDate()
      : undefined;

  return (
    <DatesView
      {...rest}
      year={year}
      month={month}
      selectedDates={selectedDates}
      outlinedDate={outlinedDate}
      disabledDates={getDisabledDates(year, month, minDate, maxDate)}
    />
  );
}
