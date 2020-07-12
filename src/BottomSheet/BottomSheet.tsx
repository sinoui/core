import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Modal from '@sinoui/core/Modal';
import Slide from '@sinoui/core/Slide';

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
  outline: none;
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
  onBackdropClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 子元素
   */
  children?: React.ReactNode;
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
      addEndListener,
      ...rest
    } = props;
    return (
      <>
        <ModalWrapper
          {...rest}
          open={!!open}
          backdropClick={backdropClick}
          onBackdropClick={onBackdropClick}
          ref={ref}
        >
          <Slide
            in={open}
            appear
            direction="up"
            addEndListener={addEndListener}
          >
            <BottomSheetWrapper
              className={classNames('sinoui-bottom-sheet', className)}
            >
              {children}
            </BottomSheetWrapper>
          </Slide>
        </ModalWrapper>
      </>
    );
  },
);

export default BottomSheet;
