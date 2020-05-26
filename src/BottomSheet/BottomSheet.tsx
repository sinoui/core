import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import classNames from 'classnames';
import Modal from '@sinoui/core/Modal';
import { CSSTransition } from 'react-transition-group';

const ModalWrapper = styled(Modal)`
  display: flex;
  align-items: center;
`;

const BottomSheetWrapper = styled.div`
  box-shadow: ${(props) => props.theme.shadows[16]};
  background: ${({ theme }) => theme.palette.background.paper};
  width: 100%;
  max-height: 50%;
  align-self: flex-end;
  transform: translate3d(0, 0, 0);
  overflow-y: auto;
`;

const timeout = 300;

const GlobalStyle = createGlobalStyle`
.sinoui-bottom-sheet__translate-appear {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.sinoui-bottom-sheet__translate-appear-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity ${timeout}ms, transform ${timeout}ms, height ${timeout}ms;
}

.sinoui-bottom-sheet__translate-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0); 

}

.sinoui-bottom-sheet__translate-enter-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity ${timeout}ms, transform ${timeout}ms, height ${timeout}ms;
}

.sinoui-bottom-sheet__translate-exit { 
  opacity: 1;
  transform: translate3d(0, 0, 0);
 ;
}

.sinoui-bottom-sheet__translate-exit-active { 
  opacity: 0;
  transform: translate3d(0, 100%, 0);
  transition: opacity ${timeout}ms, transform ${timeout}ms, height ${timeout}ms
}
`;
export interface BottomSheetProps {
  /**
   * 是否显示
   */
  open?: boolean;
  /**
   * 是否响应点击遮罩层事件
   */
  backdropClick?: boolean;
  /**
   * 点击遮罩层触发的回调函数
   */
  onBackdropClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 动画延长时间
   */
  transitionDuration?: number;
  /**
   * 过渡结束监听器
   */
  addEndListener?: any;
  /**
   * 添加自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 底部滑出组件
 */
const BottomSheet = React.forwardRef(
  (props: BottomSheetProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      open,
      backdropClick = true,
      onBackdropClick,
      className,
      children,
      transitionDuration = 300,
      addEndListener,
      ...rest
    } = props;
    return (
      <ModalWrapper
        {...rest}
        open={open}
        backdropClick={backdropClick}
        onBackdropClick={onBackdropClick}
        ref={ref}
      >
        <CSSTransition
          classNames="sinoui-bottom-sheet__translate"
          timeout={transitionDuration}
          in={open}
          appear
          unmountOnExit
          addEndListener={addEndListener}
        >
          <>
            <BottomSheetWrapper
              className={classNames('sinoui-bottom-sheet', className)}
            >
              {children}
            </BottomSheetWrapper>
            <GlobalStyle />
          </>
        </CSSTransition>
      </ModalWrapper>
    );
  },
);

export default BottomSheet;
