import { isTime } from '../isTime';

it('判断是否符合时间格式', () => {
  expect(isTime('1:12')).toBe(true);
  expect(isTime('12:12')).toBe(true);
  expect(isTime('122:1212')).toBe(false);
  expect(isTime('xx')).toBe(false);
  expect(isTime('30:26')).toBe(false);
  expect(isTime('12:67')).toBe(false);
});
