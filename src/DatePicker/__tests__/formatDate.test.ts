import formatDate from '../formatDate';

it('格式化日期', () => {
  expect(formatDate(new Date(2020, 2, 3))).toBe('2020-03-03');
  expect(formatDate(new Date(2020, 10, 12))).toBe('2020-11-12');
  expect(formatDate(new Date(2020, 2, 3, 10, 12, 7), true)).toBe(
    '2020-03-03 10:12:07',
  );
  expect(formatDate(undefined)).toBe(undefined);
});
