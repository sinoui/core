import leadingZero from './leadingZero';

/**
 * 格式化日期
 *
 * @param date 日期
 * @param withTime 是否带上时间
 */
function formatDate(date?: Date, withTime = false) {
  if (!date) {
    return undefined;
  }
  const dateStr = `${date.getFullYear()}-${leadingZero(
    date.getMonth() + 1,
  )}-${leadingZero(date.getDate())}`;
  if (withTime) {
    return `${dateStr} ${leadingZero(date.getHours())}:${leadingZero(
      date.getMinutes(),
    )}:${leadingZero(date.getSeconds())}`;
  }
  return dateStr;
}

export default formatDate;
