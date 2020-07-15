import mem from '../mem';

it('缓存函数', () => {
  let i = 0;
  // eslint-disable-next-line no-plusplus
  const fn = (_: string) => ++i;
  const memoized = mem(fn);

  expect(memoized('foo')).toBe(1);
  expect(memoized('bar')).toBe(2);
  expect(memoized('foo')).toBe(1);
  expect(memoized('bar')).toBe(2);

  memoized.clear();

  expect(memoized('foo')).toBe(3);
  expect(memoized('bar')).toBe(4);
  expect(memoized('foo')).toBe(3);
  expect(memoized('bar')).toBe(4);
});
