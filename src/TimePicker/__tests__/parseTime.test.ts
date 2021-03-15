import parseTime from '../parseTime';

it('解析时间', () => {
  expect(parseTime('1:12')).toEqual([1, 12]);
  expect(parseTime('12:12')).toEqual([12, 12]);
  expect(parseTime('12:1')).toEqual([12, 1]);
  expect(parseTime('')).toEqual([undefined, undefined]);
  expect(parseTime('1212:xxx')).toEqual([undefined, undefined]);
});
