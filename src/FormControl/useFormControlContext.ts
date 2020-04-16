import { useContext } from 'react';
import FormControlContext from './FormControlContext';

/**
 * 获取表单控件上下文
 */
function useFormControlContext() {
  const formControlContext = useContext(FormControlContext);

  return formControlContext;
}

export default useFormControlContext;
