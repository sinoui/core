import { useContext } from 'react';
import FormItemContext from './FormItemContext';

/**
 * 获取表单控件上下文
 */
function useFormItemContext() {
  const formItemContext = useContext(FormItemContext);

  return formItemContext;
}

export default useFormItemContext;
