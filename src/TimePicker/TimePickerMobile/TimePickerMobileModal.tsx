import Fade from '@sinoui/core/Fade';
import type { ModalProps } from '@sinoui/core/Modal';
import Modal from '@sinoui/core/Modal';
import { useEffect } from 'react';

import scrollLock from './scrollLock';
import TimePickerMobileView from './TimePickerMobileView';

/**
 * 组件属性
 */
interface Props extends Omit<ModalProps, 'children'> {
  /**
   * 值
   */
  value?: string;
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value?: string) => void;
}

/**
 * 移动端日期区间选择弹窗
 *
 * @param props 组件属性
 */
const DateRangeMobileModal: React.FC<Props> = (props) => {
  const { value, onRequestClose, onChange, open } = props;

  useEffect(() => {
    if (open) {
      scrollLock.enable();
    } else {
      scrollLock.disable();
    }
  }, [open]);

  return (
    <Modal open={open} autoFocus={false} center enforceFocus={false}>
      <Fade in={open}>
        <TimePickerMobileView
          value={value}
          onRequestClose={onRequestClose}
          onChange={onChange}
        />
      </Fade>
    </Modal>
  );
};

export default DateRangeMobileModal;
