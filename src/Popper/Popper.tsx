/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import type {
  Instance,
  Modifier,
  OptionsGeneric,
  Placement,
  VirtualElement,
} from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import { detect } from 'detect-browser';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from 'styled-components';

import ModalManager from '../Modal/ModalManager';
import type { ContainerElement } from '../utils/getContainerElement';
import getContainerElement from '../utils/getContainerElement';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useMultiRefs from '../utils/useMultiRefs';

/**
 *
 */
interface TransitionProps {
  /**
   *
   */
  in: boolean;
  /**
   *
   */
  onEnter?: () => void;
  /**
   *
   */
  onEntered?: () => void;
  /**
   *
   */
  onExit?: () => void;
}

// 注意：这里不要用React.ComponentPropsWithRef代替React.HTMLAttributes，因为前者目前有ts性能问题
/**
 *
 */
export interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 设置为`true`，则打开弹出内容。否则关闭弹出内容。
   */
  open: boolean;
  /**
   * 弹出窗内容
   */
  children:
    | Omit<React.ReactNode, 'function'>
    | ((transitionProps: TransitionProps) => React.ReactNode);
  /**
   * 参考元素。弹出提示内容会基于参考内容进行定位
   */
  referenceElement: ContainerElement<HTMLElement | VirtualElement>;
  /**
   * 弹出内容相对参考元素的定位位置。默认为`bottom`。
   */
  placement?: Placement;
  /**
   * 指定传送门渲染容器。默认为`document.body`。
   */
  container?: ContainerElement;
  /**
   * 是否将弹出内容以传送门的方式渲染。默认为`true`。
   */
  portal?: boolean;
  /**
   * 指向popper实例的引用
   */
  popperRef?: React.Ref<Instance | null>;
  /**
   * 传给popper的插件。
   */
  modifiers?: Partial<Modifier<any, any>>[];
  /**
   * 传给popper的配置。
   */
  popperOptions?: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>;
  /**
   * 模态框管理器
   */
  modalManager?: ModalManager;
  /**
   * 自动获取焦点
   */
  autoFocus?: boolean;
  /**
   * 设置焦点不离开模态框
   */
  enforceFocus?: boolean;
  /**
   * 指定弹层的z-index。如果是以portal的方式弹出的，则z-index默认为1300。
   */
  zIndex?: number;
}

const DEFAULT_STYLE: React.CSSProperties = {
  position: 'fixed',
  left: '0px',
  top: '0px',
};

/**
 * 弹出提示组件
 *
 * 此组件封装的是[popper.js](https://popper.js.org)，将包含的内容以弹出的方式定位到指定的相对位置。
 */
const Popper = React.forwardRef<HTMLDivElement, Props>(function Popper(
  {
    open,
    children,
    referenceElement,
    placement = 'bottom',
    container,
    portal = true,
    popperRef: popperRefProp,
    modifiers,
    popperOptions,
    style,
    modalManager = ModalManager.defaultModalManager(),
    autoFocus = false,
    enforceFocus = false,
    zIndex: zIndexProp,
    ...rest
  },
  ref,
) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const handleTooltipRef = useMultiRefs(tooltipRef, ref);
  const popperRef = useRef<Instance | null>(null);
  const handlePopperRef = useMultiRefs(popperRef, popperRefProp);
  const [exited, setExited] = useState(!open);
  const transition =
    React.isValidElement(children) && children.props.in != null;
  const isShow = open || (transition && !exited);
  const theme = useTheme();
  const zIndex = portal ? zIndexProp ?? theme?.zIndex?.modal : zIndexProp;
  const computedStyle = useMemo(
    () => ({
      zIndex,
      ...DEFAULT_STYLE,
      ...style,
    }),
    [zIndex, style],
  );
  const containerElement = getContainerElement(container);

  useEnhancedEffect(() => {
    const tooltip = tooltipRef.current;
    const reference = getContainerElement(referenceElement);
    if (isShow && tooltip && reference) {
      const popper = createPopper(reference, tooltip, {
        placement,
        modifiers: modifiers ?? [],
        ...popperOptions,
      });
      handlePopperRef(popper);
      return () => {
        popper.destroy();
        handlePopperRef(null);
      };
    }
    return undefined;
  }, [
    handlePopperRef,
    isShow,
    modifiers,
    placement,
    popperOptions,
    referenceElement,
  ]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    popperRef.current?.update();
  });

  useEffect(() => {
    const browser = detect();
    if (browser?.name === 'ie') {
      return undefined;
    }

    const tooltip = tooltipRef.current;
    if (!isShow || !portal || !tooltip) {
      return undefined;
    }
    modalManager.add({
      node: tooltip,
      content: tooltip,
      container: containerElement,
      autoFocus,
      enforceFocus,
    });
    return () => modalManager.remove(tooltip);
  }, [
    autoFocus,
    containerElement,
    enforceFocus,
    isShow,
    modalManager,
    open,
    portal,
  ]);

  const handleEnter = useCallback(() => {
    setExited(false);
  }, []);

  const handleEntered = useCallback(() => {
    // 修复可能动画结束后提示内容的尺寸发生变化的情况。
    // eslint-disable-next-line no-unused-expressions
    popperRef.current?.update();
  }, []);

  const handleExited = useCallback(() => {
    setExited(true);
  }, []);

  if (!isShow) {
    return null;
  }

  const childProps: any = {
    in: open,
  };

  if (transition) {
    childProps.onEnter = handleEnter;
    childProps.onEntered = handleEntered;
    childProps.onExited = handleExited;
  }

  const content = (
    <div ref={handleTooltipRef} role="tooltip" style={computedStyle} {...rest}>
      {typeof children === 'function'
        ? children(childProps)
        : React.isValidElement(children) && typeof children.type !== 'string'
        ? React.cloneElement(children, childProps)
        : children}
    </div>
  );

  return portal ? ReactDOM.createPortal(content, containerElement) : content;
});

export default Popper;
