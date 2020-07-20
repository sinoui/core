import parseTime from '../parseTime';

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

const getNowHourMinite12 = () => {
  const now = new Date();
  const nowHours24 = now.getHours();
  return [nowHours24 > 12 ? nowHours24 - 12 : nowHours24, now.getMinutes()];
};

/**
 * 根据当前时间 计算时、分针旋转角度
 * @param hour 时
 * @param minute 分
 */
export function getRotateDegByTimeValue(value: string) {
  const [hour, minute] = value ? parseTime(value) : getNowHourMinite12();
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

/**
 * 根据12小时制 和 am 获取24h
 * @param hour
 * @param isAM
 */
export function get24HourByIsAm(hour: number, isAM: boolean) {
  if (isAM) {
    return hour === 12 ? 0 : hour;
  }
  return hour + 12 === 24 ? 12 : hour + 12;
}

/**
 * 格式化时分 为hh 或 mm
 * @param value
 */
export function formatHourMinute(value: number) {
  return value < 10 ? `0${value}` : `${value}`;
}
