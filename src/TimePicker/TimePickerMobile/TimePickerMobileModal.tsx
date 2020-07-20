import React from 'react';
import Modal from '@sinoui/core/Modal';
import type { ModalProps } from '@sinoui/core/Modal';
import Fade from '@sinoui/core/Fade';
import MobileTimePickerView from './MobileTimePickerView';

interface Props extends Omit<ModalProps, 'children'> {
  value?: string;
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (hour: number, minute: number) => void;
}

/**
 * 移动端日期区间选择弹窗
 * @param props
 */
export default function DateRangeMobileModal(props: Props) {
  const { value, onRequestClose, onChange, open } = props;
  return (
    <Modal open={open} backdrop={false} autoFocus={false} enforceFocus={false}>
      <Fade in={open}>
        <MobileTimePickerView
          value={value}
          onRequestClose={onRequestClose}
          onChange={onChange}
        />
      </Fade>
    </Modal>
  );
}
