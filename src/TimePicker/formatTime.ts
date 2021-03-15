const zeroLeading = (num: number) => (num < 10 ? `0${num}` : `${num}`);

/**
 * 格式化时间
 *
 * @param hour 小时
 * @param minute 分钟
 */
function formatTime(hour: number, minute: number) {
  return `${zeroLeading(hour)}:${zeroLeading(minute)}`;
}

export default formatTime;
