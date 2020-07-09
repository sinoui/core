import getDisabledDates from '../getDisabledDates';

it('不指定可用区间，没有禁用日期', () => {
  expect(getDisabledDates(2020, 6)).toBeUndefined();
});

it('可用区间在指定月之前', () => {
  expect(getDisabledDates(2020, 6, undefined, new Date(2020, 5, 30))).toEqual(
    new Array(31).fill(0).map((_, index) => index + 1),
  );
});

it('可用区间在指定月之后', () => {
  expect(getDisabledDates(2020, 6, new Date(2020, 7, 30))).toEqual(
    new Array(31).fill(0).map((_, index) => index + 1),
  );
});

it('开始时间早于指定月，没有结束时间', () => {
  expect(getDisabledDates(2020, 6, new Date(2020, 4, 30))).toBeUndefined();
});

it('开始时间早于指定月，结束时间晚于指定月', () => {
  expect(
    getDisabledDates(2020, 6, new Date(2020, 4, 1), new Date(2020, 7, 1)),
  ).toBeUndefined();
});

it('开始时间为空，结束时间晚于指定月', () => {
  expect(
    getDisabledDates(2020, 6, undefined, new Date(2020, 7, 1)),
  ).toBeUndefined();
});

it('可用区间与指定月部分重叠', () => {
  expect(
    getDisabledDates(2020, 6, new Date(2020, 6, 3), new Date(2020, 6, 29)),
  ).toEqual([1, 2, 29, 30, 31]);
});
