import getDayOfWeek from '../getDayOfWeek';

it('获取指定日期属于周几', () => {
  expect(getDayOfWeek(new Date(2020, 7, 1))).toBe(5);
  expect(getDayOfWeek(new Date(2020, 7, 1), true)).toBe(6);
  expect(getDayOfWeek(new Date(2020, 7, 2))).toBe(6);
  expect(getDayOfWeek(new Date(2020, 7, 2), true)).toBe(0);
});
