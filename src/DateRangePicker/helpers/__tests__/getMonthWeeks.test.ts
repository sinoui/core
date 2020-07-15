import getMonthWeeks, { cacheDate } from '../getMonthWeeks';

it('获取指定月的周', () => {
  expect(getMonthWeeks(2020, 7)).toEqual([
    [cacheDate(new Date(2020, 7, 1)), cacheDate(new Date(2020, 7, 2))],
    [cacheDate(new Date(2020, 7, 3)), cacheDate(new Date(2020, 7, 9))],
    [cacheDate(new Date(2020, 7, 10)), cacheDate(new Date(2020, 7, 16))],
    [cacheDate(new Date(2020, 7, 17)), cacheDate(new Date(2020, 7, 23))],
    [cacheDate(new Date(2020, 7, 24)), cacheDate(new Date(2020, 7, 30))],
    [cacheDate(new Date(2020, 7, 31)), cacheDate(new Date(2020, 7, 31))],
  ]);

  expect(getMonthWeeks(2020, 8)).toEqual([
    [cacheDate(new Date(2020, 8, 1)), cacheDate(new Date(2020, 8, 6))],
    [cacheDate(new Date(2020, 8, 7)), cacheDate(new Date(2020, 8, 13))],
    [cacheDate(new Date(2020, 8, 14)), cacheDate(new Date(2020, 8, 20))],
    [cacheDate(new Date(2020, 8, 21)), cacheDate(new Date(2020, 8, 27))],
    [cacheDate(new Date(2020, 8, 28)), cacheDate(new Date(2020, 8, 30))],
  ]);

  expect(getMonthWeeks(2020, 10)).toEqual([
    [cacheDate(new Date(2020, 10, 1)), cacheDate(new Date(2020, 10, 1))],
    [cacheDate(new Date(2020, 10, 2)), cacheDate(new Date(2020, 10, 8))],
    [cacheDate(new Date(2020, 10, 9)), cacheDate(new Date(2020, 10, 15))],
    [cacheDate(new Date(2020, 10, 16)), cacheDate(new Date(2020, 10, 22))],
    [cacheDate(new Date(2020, 10, 23)), cacheDate(new Date(2020, 10, 29))],
    [cacheDate(new Date(2020, 10, 30)), cacheDate(new Date(2020, 10, 30))],
  ]);
});

it('星期从周日开始', () => {
  expect(getMonthWeeks(2020, 7, 0)).toEqual([
    [cacheDate(new Date(2020, 7, 1)), cacheDate(new Date(2020, 7, 1))],
    [cacheDate(new Date(2020, 7, 2)), cacheDate(new Date(2020, 7, 8))],
    [cacheDate(new Date(2020, 7, 9)), cacheDate(new Date(2020, 7, 15))],
    [cacheDate(new Date(2020, 7, 16)), cacheDate(new Date(2020, 7, 22))],
    [cacheDate(new Date(2020, 7, 23)), cacheDate(new Date(2020, 7, 29))],
    [cacheDate(new Date(2020, 7, 30)), cacheDate(new Date(2020, 7, 31))],
  ]);

  expect(getMonthWeeks(2020, 8, 0)).toEqual([
    [cacheDate(new Date(2020, 8, 1)), cacheDate(new Date(2020, 8, 5))],
    [cacheDate(new Date(2020, 8, 6)), cacheDate(new Date(2020, 8, 12))],
    [cacheDate(new Date(2020, 8, 13)), cacheDate(new Date(2020, 8, 19))],
    [cacheDate(new Date(2020, 8, 20)), cacheDate(new Date(2020, 8, 26))],
    [cacheDate(new Date(2020, 8, 27)), cacheDate(new Date(2020, 8, 30))],
  ]);
});
