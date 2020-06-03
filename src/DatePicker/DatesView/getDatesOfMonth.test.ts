import getDatesOfMonth from './getDatesOfMonth';

it('或者指定月的天数', () => {
  expect(getDatesOfMonth(2020, 5)).toBe(30);
  expect(getDatesOfMonth(2020, 1)).toBe(29);
  expect(getDatesOfMonth(2019, 1)).toBe(28);
});
