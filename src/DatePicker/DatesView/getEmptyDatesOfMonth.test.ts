import getEmptyDatesOfMonth from './getEmptyDatesOfMonth';

it('从星期一开始', () => {
  expect(getEmptyDatesOfMonth(2020, 5, 1)).toBe(0);
  expect(getEmptyDatesOfMonth(2020, 4, 1)).toBe(4);
});

it('从星期日开始', () => {
  expect(getEmptyDatesOfMonth(2020, 5, 0)).toBe(1);
  expect(getEmptyDatesOfMonth(2020, 4, 0)).toBe(5);
});
