import { useState } from 'react';

/**
 * 管理输入框值
 *
 * @param valueStr 同步的值
 */
export default function useInputValue(
  valueStr?: string,
): [string, (value: string) => void] {
  const [value, setValue] = useState(valueStr ?? '');
  const [syncValue, setSyncValue] = useState(valueStr);

  if (syncValue !== valueStr) {
    setSyncValue(valueStr);
    setValue(valueStr ?? '');
  }
  return [value ?? '', setValue];
}
