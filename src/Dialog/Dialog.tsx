import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Modal from '@sinoui/core/Modal';
import { CSSTransition } from 'react-transition-group';
import DialogContainer, { DialogContainerProps } from './DialogContainer';

const GlobalStyle = createGlobalStyle`
.sinoui-dialog-enter {
   opacity: 0;
}

.sinoui-dialog-enter-active {
  opacity: 1;
  transition: opacity 200ms;
}

.sinoui-dialog-exit { 
  opacity: 1;
}

.sinoui-dialog-exit-active { 
   opacity: 0;
  transition: opacity 200ms;
}
`;

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
  /**
   * 是否显示遮罩层
   */
  backdrop?: boolean;
}

function Dialog(props: DialogProps) {
  const {
    backdropClick = true,
    transitionDuration = 300,
    open,
    ...rest
  } = props;
  return (
    <ModalWrapper {...rest} backdropClick={backdropClick} open={open}>
      <CSSTransition
        timeout={transitionDuration}
        appear
        in={open}
        classNames="sinoui-dialog"
        unmountOnExit
      >
        <>
          <DialogContainer {...props} />
          <GlobalStyle />
        </>
      </CSSTransition>
    </ModalWrapper>
  );
}

export default Dialog;
