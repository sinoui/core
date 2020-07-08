import getCrossDateRange from '../getCrossDateRange';

const range1: [Date, Date] = [new Date(2020, 8, 1), new Date(2020, 8, 10)];

it('区间1包含区间2', () => {
  const range2: [Date, Date] = [new Date(2020, 8, 4), new Date(2020, 8, 6)];
  expect(getCrossDateRange(range1, range2)).toEqual(range2);
  expect(getCrossDateRange(range2, range1)).toEqual(range2);
});

it('区间2在区间1的左侧，但是没有重叠部分', () => {
  const range2: [Date, Date] = [new Date(2020, 7, 5), new Date(2020, 7, 18)];
  expect(getCrossDateRange(range1, range2)).toBe(undefined);
  expect(getCrossDateRange(range2, range1)).toBe(undefined);
});

it('区间2在区间1的左侧，有部分重叠', () => {
  const range2: [Date, Date] = [new Date(2020, 7, 5), new Date(2020, 8, 5)];
  expect(getCrossDateRange(range1, range2)).toEqual([range1[0], range2[1]]);
  expect(getCrossDateRange(range2, range1)).toEqual([range1[0], range2[1]]);
});

it('区间2在区间1的右侧，没有重叠部分', () => {
  const range2: [Date, Date] = [new Date(2020, 9, 1), new Date(2020, 9, 5)];
  expect(getCrossDateRange(range1, range2)).toBe(undefined);
  expect(getCrossDateRange(range2, range1)).toBe(undefined);
});

it('区间2在区间1的右侧，有部分重叠', () => {
  const range2: [Date, Date] = [new Date(2020, 8, 10), new Date(2020, 9, 30)];

  expect(getCrossDateRange(range1, range2)).toEqual([range2[0], range1[1]]);
  expect(getCrossDateRange(range2, range1)).toEqual([range2[0], range1[1]]);
});

it('区间2包含区间1', () => {
  const range2: [Date, Date] = [new Date(2020, 1, 1), new Date(2021, 1, 1)];

  expect(getCrossDateRange(range1, range2)).toEqual(range1);
  expect(getCrossDateRange(range2, range1)).toEqual(range1);
});
