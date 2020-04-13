import React, { useEffect } from 'react';
import classNames from 'classnames';
import DialogTitle from '@sinoui/core/DialogTitle';
import Draggable from './utils/Draggable';
import DialogWrapper from './DialogWrapper';
import Iframe from './Iframe';
import CloseIcon from './CloseIcon';

export interface DialogContainerProps {
  /**
   * 布局方式
   */
  absolute?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 是否全屏显示
   */
  fullScreen?: boolean;
  /**
   * 最大宽度显示,对话框将根据 maxWidth 的值进行自我调整
   */
  fullWidth?: boolean;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 宽度自适应
   */
  autoWidth?: boolean;
  /**
   * 是否可拖拽
   */
  draggable?: boolean;
  /**
   * 是否显示嵌套层
   */
  containsIframe?: boolean;
  /**
   * 是否显示关闭按钮
   */
  showCloseIcon?: boolean;
  /**
   * 点击关闭按钮的回调函数
   */
  onRequestClose?: () => void;
}

/**
 * 弹窗的根组件
 */
function DialogContainer(props: DialogContainerProps) {
  const {
    children,
    absolute,
    fullScreen,
    fullWidth,
    autoWidth,
    className,
    draggable = true,
    containsIframe = true,
    showCloseIcon,
    onRequestClose,
    ...rest
  } = props;

  const dialogContainerRef = React.createRef<HTMLElement | any>();

  useEffect(() => {
    let drag: Draggable;
    if (draggable) {
      drag = new Draggable({
        container: dialogContainerRef.current,
        handler: '.sinoui-dialog-title',
        bounds: true,
      });
    }

    return () => {
      if (draggable) {
        drag.teardown();
      }
    };
  });

  const nodes = React.Children.toArray(children).map((node: any) => {
    if (node.type === DialogTitle) {
      return (
        <DialogTitle
          key="dialogTitle"
          {...node.props}
          showCloseIcon={showCloseIcon}
          draggable={draggable}
        >
          {node.props.children}
          {showCloseIcon && <CloseIcon onClick={onRequestClose} />}
        </DialogTitle>
      );
    }
    return node;
  });

  return (
    <DialogWrapper
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      className={classNames(className, {
        'sinoui-dialog--draggable': draggable,
      })}
      autoWidth={autoWidth}
      {...rest}
      ref={dialogContainerRef}
    >
      {nodes}
      {containsIframe && (
        <Iframe frameBorder={0} scrolling="false" absolute={absolute} />
      )}
    </DialogWrapper>
  );
}

export default DialogContainer;
