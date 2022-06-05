import padStart from 'lodash/padStart';

/**
 * 校验年月的字符串格式是否正确
 * @param value 需要校验的字符串
 * @returns  是否匹配'YYYY-MM'的日期格式
 */
export const isValidateDate = (value?: string) =>
  value && /\d{4}-(0[1-9]|1[0-2])$/.test(value);

/**
 * 获取当前时间的年月信息
 *
 * @returns YYYY-MM格式的字符串
 */
export const getDefaultYearMonth = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  return `${year}-${(padStart(String(month + 1)), 2, '0')}`;
};

/**
 * 将字符串类型的日期转换成对应的年月
 * @param value
 * @returns
 */
export const getYearAndMonthByValue = (value: string) => {
  const [year, month] = value.split('-');

  return [Number(year), Number(month) - 1];
};
