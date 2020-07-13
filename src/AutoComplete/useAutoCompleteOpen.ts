import { useState } from 'react';
import useEventCallback from '../utils/useEventCallback';
import type { AutoCompleteCloseReason } from './types';

/**
 * 管理自动完成组件的打开状态
 *
 * @param openProp open属性
 * @param onOpen 打开回调函数
 * @param onClose 关闭回调函数
 */
export default function useAutoCompleteOpen(
  openProp?: boolean,
  onOpen?: (open: boolean) => void,
  onClose?: (reason: AutoCompleteCloseReason) => void,
) {
  const isOpenControlled = openProp != null;
  const [open, setOpen] = useState(false);

  const handleOpen = useEventCallback(() => {
    if (isOpenControlled && onOpen) {
      onOpen(true);
    } else {
      setOpen(true);
    }
  });

  const handleClose = useEventCallback((reason: AutoCompleteCloseReason) => {
    if (isOpenControlled && onClose) {
      onClose(reason);
    } else {
      setOpen(false);
    }
  });

  return {
    isOpen: openProp ?? open,
    open: handleOpen,
    close: handleClose,
  };
}
