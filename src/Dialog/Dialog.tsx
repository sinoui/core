import React from 'react';
import Modal from '@sinoui/core/Modal';
import type { ModalProps } from '@sinoui/core/Modal';
import Fade from '../Fade';
import DialogContainer, { DialogContainerProps } from './DialogContainer';

export interface DialogProps extends DialogContainerProps {
  /**
   * 为true时打开Modal
   *
   * @type {boolean}
   */
  open?: boolean;
  /**
   * 为true时可以响应backdrop点击事件。
   */
  backdropClick?: boolean;
  /**
   * Dialog展现过渡动画。默认为Fade。
   *
   * @type {(string | ())}
   */
  transition?: React.ElementType;
  /**
   * 过渡动画时长。
   *
   */
  transitionDuration?:
    | number
    | {
        enter: number;
        exit: number;
      };
  /**
   * backdrop被点击时的回调函数
   *
   * @type {(SyntheticMouseEvent<*>) => void}
   */
  onBackdropClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 是否显示遮罩层
   */
  backdrop?: boolean;
  onClose?: (
    reason: 'backdropClick' | 'escapeKeydown' | 'closeIconClick',
  ) => void;
  /**
   * 过渡结束监听器
   */
  addEndListener?: any;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  modalProps?: ModalProps;
}

function Dialog(props: DialogProps) {
  const {
    open = true,
    addEndListener,
    transition: Transition = Fade,
    transitionDuration,
    backdrop,
    backdropClick,
    onBackdropClick,
    onRequestClose,
    onClose,
    modalProps,
    ...rest
  } = props;
  const handleClose = (
    reason: 'backdropClick' | 'escapeKeydown' | 'closeIconClick',
  ) => {
    if (onRequestClose) {
      onRequestClose(reason);
    }
    if (onClose) {
      onClose(reason);
    }
  };
  return (
    <Modal
      backdrop={backdrop}
      backdropClick={backdropClick}
      onBackdropClick={onBackdropClick}
      open={open}
      center
      onClose={handleClose}
      {...modalProps}
    >
      <Transition timeout={transitionDuration} appear in={open}>
        <DialogContainer onRequestClose={handleClose} {...rest} />
      </Transition>
    </Modal>
  );
}

export default Dialog;
