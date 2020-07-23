import React from 'react';
import Modal from '@sinoui/core/Modal';
import type { ModalProps } from '@sinoui/core/Modal';
import Fade from '@sinoui/core/Fade';
import TimePickerMobileView from './TimePickerMobileView';

interface Props extends Omit<ModalProps, 'children'> {
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
 * @param props
 */
export default function DateRangeMobileModal(props: Props) {
  const { value, onRequestClose, onChange, open } = props;
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
}
