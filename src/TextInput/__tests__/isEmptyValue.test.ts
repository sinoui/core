import isEmptyValue from '../isEmptyValue';

it('判断空值', () => {
  expect(isEmptyValue()).toBe(true);
  expect(isEmptyValue(null)).toBe(true);
  expect(isEmptyValue(false)).toBe(false);
  expect(isEmptyValue(0)).toBe(false);
  expect(isEmptyValue([])).toBe(true);
  expect(isEmptyValue([1])).toBe(false);
  expect(isEmptyValue('')).toBe(true);
  expect(isEmptyValue(true)).toBe(false);
});
