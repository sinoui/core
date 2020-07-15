import React from 'react';
import Modal from '@sinoui/core/Modal';
import type { ModalProps } from '@sinoui/core/Modal';
import Fade from '@sinoui/core/Fade';
import DateTimeMobileView from './DateTimeMobileView';

interface Props extends Omit<ModalProps, 'children'> {
  value?: string;
}

export default function DateTimeMobileModal(props: Props) {
  const { open, onRequestClose } = props;
  return (
    <Modal open={open} onRequestClose={onRequestClose} center>
      <Fade in={open}>
        <DateTimeMobileView />
      </Fade>
    </Modal>
  );
}
