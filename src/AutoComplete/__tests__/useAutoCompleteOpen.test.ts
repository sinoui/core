import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useAutoCompleteOpen from '../useAutoCompleteOpen';
import { AutoCompleteCloseReason } from '../types';

afterEach(cleanup);

it('不指定open属性，自管理open状态', () => {
  const { result } = renderHook(() => useAutoCompleteOpen());

  expect(result.current.isOpen).toBe(false);

  act(() => {
    result.current.open();
  });

  expect(result.current.isOpen).toBe(true);

  act(() => {
    result.current.close();
  });

  expect(result.current.isOpen).toBe(false);
});

it('指定open属性，外置管理open状态', () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const { result, rerender } = renderHook<boolean, any>((open = true) =>
    useAutoCompleteOpen(open, onOpen, onClose),
  );

  expect(result.current.isOpen).toBe(true);

  result.current.open();
  expect(onOpen).toBeCalled();

  result.current.close(AutoCompleteCloseReason.blur);
  expect(onClose).toBeCalledWith(AutoCompleteCloseReason.blur);

  act(() => {
    rerender(false);
  });

  expect(result.current.isOpen).toBe(false);
});
