import { renderHook, act } from '@testing-library/react-hooks';
import useSelect from '../useSelect';
import SelectInput from '../SelectInput';

it('弹窗打开状态，后缀元素为focused状态', () => {
  const { result } = renderHook(() => useSelect({}));

  const inputProps = result.current.getTextInputProps();
  act(() => {
    inputProps.onClick();
  });

  expect(result.current.getTextInputProps().inputProps.focused).toBeTruthy();
});

it('使用SelectInput渲染input', () => {
  const { result } = renderHook(() => useSelect({}));

  const inputProps = result.current.getTextInputProps();

  expect(inputProps.inputComponent).toEqual(SelectInput);
});

it('弹窗打开状态下，标签为浮动状态', () => {
  const { result } = renderHook(() => useSelect({}));

  const inputProps = result.current.getTextInputProps();
  act(() => {
    inputProps.onClick();
  });

  expect(result.current.getTextInputProps().shrink).toBeTruthy();
});

it('无值状态下，标签为正常状态', () => {
  const { result } = renderHook(() => useSelect({}));

  const inputProps = result.current.getTextInputProps();

  expect(inputProps.shrink).toBeFalsy();
});
