import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useMultiRefs from '../useMultiRefs';

it('同时触发多个ref', () => {
  const ref1 = React.createRef<string | null>();
  const ref2 = jest.fn();

  const { result } = renderHook(() => useMultiRefs(ref1, ref2));

  result.current('1');

  expect(ref1.current).toBe('1');
  expect(ref2).toBeCalledWith('1');
});

it('自动过滤空的ref', () => {
  const ref = jest.fn();
  const { result } = renderHook(() => useMultiRefs(null, ref, null, null));

  result.current('1');

  expect(ref).toBeCalledWith('1');
});
