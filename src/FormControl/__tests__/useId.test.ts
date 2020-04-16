import { renderHook, cleanup } from '@testing-library/react-hooks';
import useId from '../useId';

afterEach(cleanup);

it('生成id', () => {
  const { result, rerender } = renderHook(() => useId('input'));

  const firstId = result.current;
  expect(firstId.startsWith('input_')).toBe(true);

  rerender();
  expect(result.current).toBe(firstId);

  const { result: result2 } = renderHook(() => useId('input'));
  expect(result2.current).not.toBe(firstId);
});
