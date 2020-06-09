import formatTime from '../formatTime';

it('格式化时间', () => {
  expect(formatTime(1, 12)).toBe('01:12');
  expect(formatTime(1, 1)).toBe('01:01');
  expect(formatTime(12, 1)).toBe('12:01');
  expect(formatTime(12, 12)).toBe('12:12');
});
