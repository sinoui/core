/**
 * 如果是时针旋转角度小于 n*30 + 15 度时，指针位置不变 ，否则指针旋转 到下一个接近的时间
 * @param deg  旋转角度
 */
export function getHourOrMinuteRotateDeg(deg: number, isHour: boolean) {
  const UNIT = isHour ? 30 : 6;
  const degFloor = Math.floor(deg / UNIT);
  if (deg % UNIT >= UNIT / 2) {
    return UNIT * (degFloor + 1);
  }
  return UNIT * degFloor;
}

/**
 * 根据当前时间 计算时、分针旋转角度
 * @param hour 时
 * @param minute 分
 */
export function getRotateDegByTimeValue(hour?: number, minute?: number) {
  if (hour && minute) {
    return [(360 / 12) * hour, (360 / 60) * minute];
  }
  // 旋转0度
  return [0, 0];
}

/**
 * 根据时针旋转角度计算当前小时
 * @param deg
 */
export function getHourByRotateDeg(deg: number) {
  const UNIT = 360 / 12;
  return deg / UNIT === 0 ? 12 : deg / UNIT;
}

/**
 * 根据分针旋转角度计算当前分钟
 * @param deg
 */
export function getMinuteByRotateDeg(deg: number) {
  const UNIT = 360 / 60;
  return deg / UNIT === 0 ? 60 : deg / UNIT;
}
