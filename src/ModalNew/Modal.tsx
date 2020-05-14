import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/contains';
import ModalWrapper from './ModalWrapper';
import Backdrop from '../Backdrop';
import RenderModalBackdropProps from './RenderModalBackdropProps';
import { createChainFunction } from '../utils/createChainFunction';
import useMultiRefs from '../utils/useMultiRefs';
import lockScroll from './lockScroll';

type ModalContainer =
  | React.RefObject<HTMLElement>
  | HTMLElement
  | (() => React.RefObject<HTMLElement> | HTMLElement | undefined | null)
  | undefined
  | null;

interface Props {
  /**
   * 设置为`true`，则打开模态框。
   */
  open: boolean;
  /**
   * 点击遮罩层或者按下 `Esc` 键时的回调函数。此函数只是表达模态框组件想要关闭模态框的意图，实际上必须将`open`属性设置为`false`，才能关闭模态框。
   */
  onClose?: (reason: 'backdropClick' | 'escapeKeydown') => void;
  /**
   * 指定模态框的容器
   */
  container?: ModalContainer;
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
}

const isRefObject = (ref: any): ref is React.RefObject<HTMLElement> => {
  return ref && typeof ref === 'object' && 'current' in ref;
};

/**
 * 获取容器元素
 * @param container 容器
 */
export function getContainerElement(container: ModalContainer): HTMLElement {
  if (isRefObject(container)) {
    return container.current ?? document.body;
  }
  if (typeof container === 'function') {
    return getContainerElement(container());
  }
  return container ?? document.body;
}

const defaultRenderBackdrop = (props: RenderModalBackdropProps) => {
  return <Backdrop {...props} />;
};

/**
 * 模态框。
 */
export default function Modal({
  open,
  onClose,
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
  ...rest
}: Props) {
  const containerElement = getContainerElement(container);
  const hasTransition = 'in' in children.props;
  const [exited, setExited] = useState(!open);
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useMultiRefs(ref, (children as any).ref);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const isShowModal = open || (!open && hasTransition && !exited);

  useEffect(() => {
    if (!autoFocus || !open) {
      return undefined;
    }

    const currentActiveElement = activeElement(document) as HTMLElement;
    const modalWrapper = ref.current;

    if (
      modalWrapper &&
      (!currentActiveElement || !contains(modalWrapper, currentActiveElement))
    ) {
      lastFocusRef.current = currentActiveElement;
      modalWrapper.focus();
    }

    return () => {
      // 在 open = false 或者 组件卸载时还原焦点
      const lastFocus = lastFocusRef.current;
      if (lastFocus) {
        lastFocus.focus();
      }
    };
  }, [autoFocus, open]);

  useEffect(() => {
    if (!open || !enforceFocus) {
      return undefined;
    }

    const listener = () => {
      const currentActiveElement = activeElement();
      const modalWrapper = ref.current;
      if (
        currentActiveElement &&
        modalWrapper &&
        !contains(modalWrapper, currentActiveElement)
      ) {
        modalWrapper.focus();
      }
    };
    const delayListener = () => setTimeout(listener);

    document.addEventListener('focus', delayListener, true);

    return () => document.removeEventListener('focus', delayListener, true);
  }, [enforceFocus, open]);

  useEffect(() => {
    if (!isShowModal || !containerElement || !scrollLock) {
      return undefined;
    }
    return lockScroll(containerElement); // 注意，lockScroll函数返回了解除滚动锁定的回调函数。这里必须使用 return。
  }, [containerElement, isShowModal, scrollLock]);

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
      onClose('backdropClick');
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
  };

  if (!isShowModal) {
    return null;
  }

  const childProps: Record<string, any> = { ref: handleRef };

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
    <ModalWrapper $center={center} onKeyDown={handleKeydown} {...rest}>
      {backdrop
        ? renderBackdrop({
            open,
            zIndex: -1,
            onClick: handleBackdropClick,
            opacity: backdropOpacity,
            'data-testid': 'sinoui-modal-backdrop',
            ...BackdropProps,
          })
        : null}
      {React.cloneElement(children, childProps)}
    </ModalWrapper>,
    containerElement,
  );
}
