import React from 'react';
import ReactDOM from 'react-dom';

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
   * 指定模态框的容器
   */
  container?: ModalContainer;
  /**
   * 指定模态框子元素。
   */
  children?: React.ReactElement;
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

/**
 * 模态框。
 */
export default function Modal({ open, children, container }: Props) {
  return open
    ? ReactDOM.createPortal(
        React.Children.only(children),
        getContainerElement(container),
      )
    : null;
}
