import padStart from 'lodash/padStart';

/**
 * 校验年月的字符串格式是否正确
 *
 * @param value 需要校验的字符串
 * @returns  是否匹配'YYYY-MM'的日期格式
 */
export const isValidateDate = (value?: string): value is string =>
  !!value && /\d{4}-(0[1-9]|1[0-2])$/.test(value);

/**
 * 获取当前时间的年月信息
 *
 * @returns YYYY-MM格式的字符串
 */
export const getDefaultYearMonth = (): string => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  return `${year}-${(padStart(String(month + 1)), 2, '0')}`;
};

/**
 * 将字符串类型的日期转换成对应的年月
 *
 * @param value 表示年月的字符串
 * @returns 返回解析到的数据
 */
export const getYearAndMonthByValue = (value: string): [number, number] => {
  const [year, month] = value.split('-');

  return [Number(year), Number(month) - 1];
};

/**
 * 获取指定年份有效的月份范围
 *
 * @param minDate 最小年月
 * @param maxDate 最大年月
 * @param year 指定的年份
 * @returns 返回指定年份有效的月份范围
 */
export const getValidateMonthRange = (
  minDate: string | undefined,
  maxDate: string | undefined,
  year: number,
): [number, number] => {
  let min = 0;
  let max = 11;
  if (isValidateDate(minDate)) {
    const [minYear, minMonth] = getYearAndMonthByValue(minDate);
    if (minYear === year) {
      min = minMonth;
    } else if (minYear > year) {
      min = 12;
    }
  }

  if (isValidateDate(maxDate)) {
    const [maxYear, maxMonth] = getYearAndMonthByValue(maxDate);
    if (maxYear === year) {
      max = maxMonth;
    } else if (maxYear < year) {
      max = -1;
    }
  }

  return [min, max];
};
