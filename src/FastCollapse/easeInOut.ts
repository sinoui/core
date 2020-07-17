/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */

/**
 * 缓入缓出
 *
 * @param elapsed 已走完的时间
 * @param initialValue 初始值
 * @param amountOfChange 总的值变化量
 * @param duration 时长
 */
export default function easeInOut(
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
): number {
  if ((elapsed /= duration / 2) < 1) {
    return (amountOfChange / 2) * elapsed * elapsed * elapsed + initialValue;
  }
  return (
    (amountOfChange / 2) * ((elapsed -= 2) * elapsed * elapsed + 2) +
    initialValue
  );
}
