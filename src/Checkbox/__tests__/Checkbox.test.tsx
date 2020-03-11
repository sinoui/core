import React, { useState, useCallback } from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Checkbox from '@sinoui/core/Checkbox';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

const CheckboxFun = () => {
  const [val, setVal] = useState(false);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLElement>) => {
      setVal(e.target.checked);
    },
    [val],
  );
  return <Checkbox checked={val} onChange={onChange}></Checkbox>;
};

describe('Checkbox 单元测试', () => {
  // test('是否选中', () => {
  //   const { getByTestId, container } = render(
  //     <ThemeProvider theme={defaultTheme}>
  //       <Checkbox checked />
  //     </ThemeProvider>,
  //   );
  //   const check = getByTestId('checkbox');
  //   expect(check).toHaveClass('sinoui-checkbox-button__checked');
  // });
});
