import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const GlobalStyle = createGlobalStyle`
.sinoui-dialog-back-enter {
   opacity: 0;
}

.sinoui-dialog-back-enter-active {
  opacity: 1;
  transition: opacity 200ms;
}

.sinoui-dialog-back-exit { 
  opacity: 1;
}

.sinoui-dialog-back-exit-active { 
   opacity: 0;
  transition: opacity 200ms;
}
`;

const BackdropWrapper = styled.div.attrs({
  'aria-hidden': true,
  'data-sinoui-test': 'Backdrop',
})<BackdropProps>`
  position: fixed;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.visible === false ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
`;

export interface BackdropProps {
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 是否有open属性
   */
  open?: boolean;
  /**
   * transitionDuration
   */
  transitionDuration?: number;
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 添加自定义类名
   */
  className?: string;
}

export default function Backdrop(props: BackdropProps) {
  const { open, transitionDuration = 300 } = props;
  return (
    <>
      <CSSTransition
        appear
        in={open}
        timeout={transitionDuration}
        {...props}
        classNames="sinoui-dialog-back"
        unmountOnExit
      >
        <BackdropWrapper />
      </CSSTransition>
      <GlobalStyle />
    </>
  );
}
