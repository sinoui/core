import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ModalWrapper from './ModalWrapper';
import Backdrop from '../Backdrop';
import RenderModalBackdropProps from './RenderModalBackdropProps';
import { createChainFunction } from '../utils/createChainFunction';
import useMultiRefs from '../utils/useMultiRefs';
import lockScroll from './lockScroll';
import ModalManager from './ModalManager';
import ariaHiddenModal from './ariaHiddenModal';
import getContainerElement from '../utils/getContainerElement';
import type { ContainerElement } from '../utils/getContainerElement';

export interface Props {
  /**
   * 设置为`true`，则打开模态框。
   */
  open: boolean;
  /**
   * 点击遮罩层或者按下 `Esc` 键时的回调函数。此函数只是表达模态框组件想要关闭模态框的意图，实际上必须将`open`属性设置为`false`，才能关闭模态框。
   */
  onClose?: (reason: 'backdropClick' | 'escapeKeydown') => void;
  /**
   * Modal组件请求关闭时的回调函数。
   *
   * @deprecated 请使用 onClose
   *
   * 回调函数签名：
   *
   * `function(event: object, reason: string) => void`
   *
   * * **event**: 事件源
   * * **reason**: 引起关闭的原因。
   * 'escapeKeydown'表示按ESC键引起关闭，
   * 'backdropClick'表示点击backdrop引起关闭。
   *
   */
  onRequestClose?: (
    event: React.MouseEvent<HTMLButtonElement>,
    reason: string,
  ) => void;
  /**
   * 指定模态框的容器
   */
  container?: ContainerElement;
  /**
   * 指定模态框子元素。
   */
  children: React.ReactElement;
  /**
   * 模态框中的内容居中显示。
   */
  center?: boolean;
  /**
   * 设置为`false`，则不渲染遮罩层。默认为`true`，表示渲染遮罩层。
   */
  backdrop?: boolean;
  /**
   * 设置为`true`，则点击遮罩层时关闭模态框。默认为`true`。
   */
  backdropClick?: boolean;
  /**
   * 设置遮罩层透明度。默认为 `0.32`。
   */
  backdropOpacity?: number;
  /**
   * 点击遮罩层时触发的回调函数。
   */
  onBackdropClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * 设置遮罩层属性
   */
  BackdropProps?: Record<string, any>;
  /**
   * 渲染遮罩层
   */
  renderBackdrop?: (backdropProps: RenderModalBackdropProps) => void;
  /** *
   * 设置为`true`，则按下 Esc 键时关闭模态框。默认为 `true`。
   */
  keyboard?: boolean;
  /**
   * 在按下 Esc 键时触发的回调函数。
   */
  onEscapeKeydown?: (event: React.KeyboardEvent) => void;
  /**
   * 设置为`true`时，会在模态框打开时会将焦点移动模态框上，关闭时会将焦点恢复到先前焦点元素上。
   */
  autoFocus?: boolean;
  /**
   * 设置为`true`时，在打开模态框会阻止焦点移出模态框。
   */
  enforceFocus?: boolean;
  /**
   * 设置为`true`时，会在模态框打开时阻止页面内容的滚动。
   */
  scrollLock?: boolean;
  /**
   * 模态框管理器
   *
   * @private
   */
  modalManager?: ModalManager;
  /**
   * 指定z-index
   */
  zIndex?: number;
}

const defaultRenderBackdrop = (props: RenderModalBackdropProps) => {
  return <Backdrop {...props} />;
};

/**
 * 模态框。
 */
export default React.forwardRef<HTMLDivElement, Props>(function Modal(
  {
    open,
    onClose,
    onRequestClose,
    children,
    container,
    center,
    backdrop = true,
    backdropClick = true,
    backdropOpacity,
    onBackdropClick,
    BackdropProps,
    renderBackdrop = defaultRenderBackdrop,
    keyboard = true,
    onEscapeKeydown,
    autoFocus = true,
    enforceFocus = true,
    scrollLock = true,
    modalManager = ModalManager.defaultModalManager(),
    ...rest
  },
  ref,
) {
  const containerElement = getContainerElement(container);
  const hasTransition = 'in' in children.props;
  const [exited, setExited] = useState(!open);

  const modalNodeRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const handleModalNodeRef = useMultiRefs(modalNodeRef, ref);
  const handleModalContentRef = useMultiRefs(
    modalContentRef,
    (children as any).ref,
  );
  const isShowModal = open || (!open && hasTransition && !exited);
  const prevOpenRef = useRef<boolean>(false);

  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    const modalNode = modalNodeRef.current;
    const modalContent = modalContentRef.current;
    if (!isShowModal || !modalNode || !modalContent) {
      return undefined;
    }
    // 在展现模态框时添加
    modalManager.add({
      node: modalNode,
      content: modalContent,
      container: containerElement,
      autoFocus,
      enforceFocus,
    });
    // 在隐藏或者卸载模态框时移除
    return () => modalManager.remove(modalNode);
  }, [autoFocus, containerElement, enforceFocus, isShowModal, modalManager]);

  useEffect(() => {
    if (!isShowModal || !containerElement || !scrollLock) {
      return undefined;
    }
    return lockScroll(containerElement); // 注意，lockScroll函数返回了解除滚动锁定的回调函数。这里必须使用 return。
  }, [containerElement, isShowModal, scrollLock]);

  useEffect(() => {
    const modalNode = modalNodeRef.current;
    if (!isShowModal || !containerElement || !modalNode) {
      return undefined;
    }
    return ariaHiddenModal(modalNode, containerElement);
  }, [containerElement, isShowModal]);

  /**
   * 处理点击遮罩层的点击事件
   *
   * @param event 点击事件
   */
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onClose && backdropClick) {
      event.stopPropagation();
      onClose('backdropClick');
    }
    if (onRequestClose && backdropClick) {
      event.stopPropagation();
      onRequestClose(event as any, 'backdropClick');
    }
    if (onBackdropClick) {
      onBackdropClick(event);
    }
  };

  /**
   * 处理进场动画事件
   */
  const handleEnter = () => {
    setExited(false);
  };

  /**
   * 处理退场动画结束事件
   */
  const handleExited = () => {
    setExited(true);
  };

  /**
   * 处理键盘按下事件
   *
   * @param event 键盘事件
   */
  const handleKeydown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key !== 'Escape') {
      return;
    }

    if (onEscapeKeydown) {
      onEscapeKeydown(event);
    }

    if (keyboard && onClose) {
      event.stopPropagation();
      onClose('escapeKeydown');
    }

    if (keyboard && onRequestClose) {
      event.stopPropagation();
      onRequestClose(event as any, 'escapeKeydown');
    }
  };

  if (!isShowModal) {
    return null;
  }

  /**
   * 点击Modal整体
   */
  const onContainerClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const childProps: Record<string, any> = {
    ref: handleModalContentRef,
    'aria-modal': 'true',
  };

  if (!('tabIndex' in children.props)) {
    childProps.tabIndex = -1;
  }

  if (hasTransition) {
    childProps.onEnter = createChainFunction(
      children.props.onEnter,
      handleEnter,
    );
    childProps.onExited = createChainFunction(
      children.props.onExited,
      handleExited,
    );
  }

  return ReactDOM.createPortal(
    <ModalWrapper
      data-sinoui-id="modal"
      $center={center}
      onKeyDown={handleKeydown}
      ref={handleModalNodeRef}
      onClick={onContainerClick}
      {...rest}
    >
      {backdrop
        ? renderBackdrop({
            open,
            zIndex: -1,
            onClick: handleBackdropClick,
            opacity: backdropOpacity,
            'data-testid': 'sinoui-modal-backdrop',
            'aria-hidden': 'true',
            ...BackdropProps,
          })
        : null}
      {React.cloneElement(children, childProps)}
    </ModalWrapper>,
    containerElement,
  );
});
