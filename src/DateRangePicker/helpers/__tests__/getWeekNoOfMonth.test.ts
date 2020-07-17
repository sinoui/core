import getWeekNoOfMonth from '../getWeekNoOfMonth';

describe('周一是周的开始', () => {
  it('月份的第一天属于第一周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 1))).toBe(0);
  });

  it('月份第一个周日属于第一周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 2))).toBe(0);
  });

  it('月份的第一天不是周一，第二周的第一天在月份的前7天内', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 3))).toBe(1);
    expect(getWeekNoOfMonth(new Date(2020, 7, 4))).toBe(1);
  });

  it('指定日期是周日，验证指定日期属于第几周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 9))).toBe(1);
    expect(getWeekNoOfMonth(new Date(2020, 7, 16))).toBe(2);
    expect(getWeekNoOfMonth(new Date(2020, 7, 23))).toBe(3);
    expect(getWeekNoOfMonth(new Date(2020, 7, 30))).toBe(4);
  });

  it('所在月份有6个星期的情况，此月的最后一天，属于第6周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 31))).toBe(5);
  });
});

describe('周日是周的开始', () => {
  it('月份的第一天属于第一周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 1), true)).toBe(0);
  });

  it('月份的第一个周六属于第一周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 6, 4), true)).toBe(0);
  });

  it('某些月份第一个周日不属于第一周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 2), true)).toBe(1);
  });

  it('月份的第一天不是周日，第二周的第一天在月份的前7天内', () => {
    expect(getWeekNoOfMonth(new Date(2020, 6, 5), true)).toBe(1);
    expect(getWeekNoOfMonth(new Date(2020, 7, 2), true)).toBe(1);
  });

  it('指定日期是周一，验证指定日期属于第几周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 3), true)).toBe(1);
    expect(getWeekNoOfMonth(new Date(2020, 7, 10), true)).toBe(2);
    expect(getWeekNoOfMonth(new Date(2020, 7, 17), true)).toBe(3);
    expect(getWeekNoOfMonth(new Date(2020, 7, 24), true)).toBe(4);
    expect(getWeekNoOfMonth(new Date(2020, 7, 31), true)).toBe(5);
  });

  it('指定日期是周六，验证指定日期属于第几周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 1), true)).toBe(0);
    expect(getWeekNoOfMonth(new Date(2020, 7, 8), true)).toBe(1);
    expect(getWeekNoOfMonth(new Date(2020, 7, 15), true)).toBe(2);
    expect(getWeekNoOfMonth(new Date(2020, 7, 22), true)).toBe(3);
    expect(getWeekNoOfMonth(new Date(2020, 7, 29), true)).toBe(4);
  });

  it('所在月份有6个星期的情况，此月的最后一天，属于第6周', () => {
    expect(getWeekNoOfMonth(new Date(2020, 7, 30), true)).toBe(5);
    expect(getWeekNoOfMonth(new Date(2020, 7, 31), true)).toBe(5);
  });
});
