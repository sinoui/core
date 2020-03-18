import React from 'react';
import styled from 'styled-components';
import Modal from '@sinoui/core/Modal';
import Fade from '../transitions/Fade';
import DialogContainer, { DialogContainerProps } from './DialogContainer';

const ModalWrapper = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
   * 展现过渡动画。默认为Fade。
   */
  transition?: React.ReactType;
  /**
   * 过渡动画时长
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
  onBackdropClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Dialog(props: DialogProps) {
  const {
    backdropClick = true,
    transition: Transition = Fade,
    transitionDuration,
    open,
    ...rest
  } = props;
  return (
    <ModalWrapper {...rest} backdropClick={backdropClick} open={open}>
      <Transition timeout={transitionDuration} appear in={open}>
        <DialogContainer {...props} />
      </Transition>
    </ModalWrapper>
  );
}

export default Dialog;
