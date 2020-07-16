import parseDate from '../parseDate';

it('解析日期', () => {
  expect(parseDate('2020-06-06')?.getTime()).toBe(
    new Date(2020, 5, 6, 0, 0, 0).getTime(),
  );

  expect(parseDate('2020-06-06 10:00:00')?.getTime()).toBe(
    new Date(2020, 5, 6, 10, 0, 0).getTime(),
  );

  expect(parseDate()).toBe(undefined);

  expect(parseDate('2020-01-02')).toBe(parseDate('2020-01-02'));
});
