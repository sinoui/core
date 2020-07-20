import {
  getHourOrMinuteRotateDeg,
  getRotateDegByTimeValue,
  get24HourByIsAm,
} from '../utils';

describe('getHourRotateDeg', () => {
  it('时针旋转15度', () => {
    expect(getHourOrMinuteRotateDeg(15, true)).toBe(30);
  });

  it('时针旋转44度', () => {
    expect(getHourOrMinuteRotateDeg(44, true)).toBe(30);
  });

  it('分针旋转33度', () => {
    expect(getHourOrMinuteRotateDeg(33, false)).toBe(36);
  });

  it('分针旋转61度', () => {
    expect(getHourOrMinuteRotateDeg(61, false)).toBe(60);
  });
});

describe('getRotateDegByTimeValue', () => {
  it('value="03:10"', () => {
    const [hourDeg, minuteDeg] = getRotateDegByTimeValue('3:10');
    expect(hourDeg).toBe(90);
    expect(minuteDeg).toBe(60);
  });
});

describe('get24HourByIsAm', () => {
  it('上午的12:22', () => {
    expect(get24HourByIsAm(12, true)).toBe(0);
  });
  it('下午的12:22', () => {
    expect(get24HourByIsAm(12, false)).toBe(12);
  });
  it('上午的8:22', () => {
    expect(get24HourByIsAm(8, true)).toBe(8);
  });
  it('下午的8:22', () => {
    expect(get24HourByIsAm(8, false)).toBe(20);
  });
});
