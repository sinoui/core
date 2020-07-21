import isSameMonth from '../isSameMonth';

it('2020-06-12在2020年6月份', () => {
  expect(isSameMonth(new Date(2020, 5, 12), 2020, 5)).toBeTruthy();
});

it('2020-06-12不在2020年7月份', () => {
  expect(isSameMonth(new Date(2020, 5, 12), 2020, 6)).toBeFalsy();
});

it('2020-06-12不在2021年6月', () => {
  expect(isSameMonth(new Date(2020, 5, 12), 2021, 5)).toBeFalsy();
});
