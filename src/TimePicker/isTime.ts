import { TIME_REGEXP } from './constants';
import parseTime from './parseTime';

/**
 * 判断指定时间是否符合格式
 * @param time 时间
 */
export function isTime(time: string) {
  if (TIME_REGEXP.test(time)) {
    const [hour, minute] = parseTime(time);

    return (
      hour != null &&
      minute != null &&
      hour >= 0 &&
      hour <= 23 &&
      minute >= 0 &&
      minute <= 59
    );
  }
  return false;
}
