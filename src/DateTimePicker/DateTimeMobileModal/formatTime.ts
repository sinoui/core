/**
 * 格式化时间，主要作用是补0
 * @param value
 */
export default function formatTime(value?: string) {
  if (value?.length === 1) {
    return `0${value}`;
  }
  return value ?? '';
}
