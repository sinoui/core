import mem from '../utils/mem';
import { TIME_REGEXP } from './constants';

/**
 * 解析时间
 *
 * @param time 时间
 */
const parseTime = (time?: string): [number | undefined, number | undefined] => {
  if (!time) {
    return [undefined, undefined];
  }
  if (!TIME_REGEXP.test(time)) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`无法解析时间字符串：${time}，时间格式是：01:12`);
    } else {
      return [undefined, undefined];
    }
  }

  const matches = time.match(TIME_REGEXP);
  return matches
    ? [parseInt(matches[1], 10), parseInt(matches[2], 10)]
    : [undefined, undefined];
};

export default mem(parseTime);
