import { getHourOrMinuteRotateDeg, getRotateDegByTimeValue } from '../utils';

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
  it('value=""', () => {
    const [hourDeg, minuteDeg] = getRotateDegByTimeValue(undefined, undefined);
    expect(hourDeg).toBe(0);
    expect(minuteDeg).toBe(0);
  });

  it('value="03:10"', () => {
    const [hourDeg, minuteDeg] = getRotateDegByTimeValue(3, 10);
    expect(hourDeg).toBe(90);
    expect(minuteDeg).toBe(60);
  });
});
