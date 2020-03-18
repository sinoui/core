import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import omit from 'lodash/omit';
import Backdrop, { BackdropProps } from './Backdrop';
import { createChainFunction } from '../utils/createChainFunction';
import ModalLayout from './ModalLayout';

let modalRoot: null | HTMLElement;

const MODAL_ROOT_CLASSNAME = 'sinoui-modal-root';
export { MODAL_ROOT_CLASSNAME };

/**
 * 获取模态框的根元素
 *
 * @returns {HTMLElement} 返回模态框的根元素
 */
export function getModalRoot() {
  if (!modalRoot) {
    modalRoot = document.getElementById('SinouiModalRoot');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.classList.add(MODAL_ROOT_CLASSNAME);
      document.body.appendChild(modalRoot);
    }
  }
  return modalRoot;
}

function getHasTransition(props: ModalPropsType) {
  /* eslint no-prototype-builtins: 0 */
  return props.children
    ? React.Children.only(props.children).props.hasOwnProperty('in')
    : false;
}

export interface ModalPropsType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /**
   * 弹框显示的内容
   *
   * @type {React.Node}
   */
  children?: React.ReactElement;
  /**
   * 为true时打开Modal
   *
   * @type {boolean}
   */
  open?: boolean;
  /**
   * 为true时显示backdrop，为false时不显示backdrop。默认为true。
   *
   * @type {boolean}
   */
  backdrop?: boolean;
  /**
   * 为true时可以响应backdrop点击事件。
   * 为false时表示不可响应backdrop点击事件，也就是说点击backdrop时不会引起modal的关闭。
   * 默认为true。
   *
   * @type {boolean}
   */
  backdropClick?: boolean;
  /**
   * 给Backdrop指定的属性
   */
  BackdropProps?: BackdropProps;
  /**
   * backdrop被点击时的回调函数
   *
   * @type {(SyntheticMouseEvent<*>) => void}
   */
  onBackdropClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Modal组件请求关闭时的回调函数。
   *
   * 回调函数签名：
   *
   * `function(event: object, reason: string) => void`
   *
   * * **event**: 事件源
   * * **reason**: 引起关闭的原因。
   * 'escapeKeyDown'表示按ESC键引起关闭，
   * 'backdropClick'表示点击backdrop引起关闭。
   *
   */
  onRequestClose?: (
    event: React.MouseEvent<HTMLButtonElement>,
    reason: string,
  ) => void;
  /**
   * 监听动画变换结束事件
   */
  onTransitionExited?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 是否启用固定布局
   */
  fixed?: boolean;
  /**
   * 是否全屏显示。`fixed=true`时有效
   */
  fullScreen?: boolean;
  /**
   * 指定css的z-index
   */
  zIndex?: number;
  // 指定modal根节点容器
  container?: HTMLElement;
  /**
   * Modal根元素
   */
  innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * 模态框
 */
function Modal(props: ModalPropsType) {
  const {
    open = true,
    children,
    BackdropProps: backdropProps,
    backdrop = true,
    backdropClick = true,
    onBackdropClick: onBackdropClickProp,
    container = getModalRoot(),
    onTransitionExited: onTransitionExitedProp,
    onRequestClose,
    fixed = true,
    fullScreen = true,
    ...rest
  } = props;

  const element = useMemo(() => document.createElement('div'), []);

  const [exited, setExited] = useState(!open);
  const elRef = useRef<HTMLDivElement>(element);
  const openRef = useRef<boolean>(false);

  useEffect(() => {
    if (elRef.current) {
      container.appendChild(elRef.current);
      elRef.current = element;
    }

    if (openRef.current) {
      openRef.current = open;
    }

    return () => container.removeChild(elRef.current) as any;
  }, [container, element, open]);

  useEffect(() => {
    if (open !== openRef.current) {
      if (open) {
        setExited(false);
        openRef.current = open;
      } else if (!getHasTransition(props)) {
        setExited(true);
      }
    }
  }, [open, props]);

  /**
   * 点击遮罩层
   */
  const onBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (!backdropClick) {
        return;
      }
      if (onBackdropClickProp) {
        onBackdropClickProp(event);
      }

      if (onRequestClose) {
        onRequestClose(event, 'backdropClick');
      }
    },
    [onBackdropClickProp, onRequestClose, backdropClick],
  );

  const onTransitionExited = useCallback(() => {
    setExited(true);
  }, []);

  /**
   * 点击Modal整体
   */
  const onContainerClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    },
    [],
  );

  const hasTransition = getHasTransition(props);
  if (open === false && (!hasTransition || exited)) {
    return null;
  }
  const childProps: {
    onExited?: () => void;
    in?: boolean;
  } = {};

  if (hasTransition) {
    const child = React.Children.only(children);
    childProps.onExited = createChainFunction(
      child && child.props.onExited,
      onTransitionExited,
    );
    if (!open) {
      childProps.in = false;
    }
  }

  const Container = fixed ? ModalLayout : 'div';

  const containerProps = fixed
    ? { ...rest, fullScreen }
    : omit(rest, ['fullScreen', 'zIndex']);

  return ReactDOM.createPortal(
    <Container
      {...containerProps}
      ref={props.innerRef}
      onClick={onContainerClick}
    >
      {backdrop && (
        <Backdrop
          {...backdropProps}
          onClick={onBackdropClick}
          open={props.open}
        />
      )}
      {React.cloneElement(React.Children.only(children) as any, childProps)}
    </Container>,
    elRef.current,
  );
}

export default Modal;
