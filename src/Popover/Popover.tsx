/* eslint-disable no-param-reassign */
import React, { useRef, useCallback, useEffect } from 'react';
import contains from 'dom-helpers/query/contains';
import debounce from 'lodash/debounce';
import EventListener from 'react-event-listener';
import { zIndex } from '@sinoui/theme';
import Modal from '@sinoui/core/Modal';
import Iframe from './Iframe';
import { getScrollTop } from '../utils/domHelpers';
import Grow from '../transitions/Grow';
import PopoverPosition from './PopoverPosition';
import PopoverLayout from './PopoverLayout';
import PopoverContent from './PopoverContent';

export interface ActionParam {
  updatePosition: () => void;
}

/**
 * CSS3变换原点。
 */
export interface TransitionOrigin {
  horizontal: number | 'left' | 'center' | 'right';
  vertical: number | 'top' | 'center' | 'bottom';
}

export interface PopoverProps {
  /**
   * 锚点元素。用于设置popover的显示位置。
   *
   * @type {Element}
   */
  anchorEl?: Element | null;
  /**
   * 锚点原点，这是锚点元素上的用来显示popover出来的元素起始位置。
   *
   * 如果anchorReference是`anchorPosition`，则`anchorOrigin`不起作用。
   *
   * @type {({
   *     vertical: 'top' | 'center' | 'bottom',
   *     horizontal: 'left' | 'center' | 'right',
   *   })}
   */
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  /**
   * 锚点位置
   *
   * @type {{
   *     left: number,
   *     top: number,
   *   }}
   */
  anchorPosition?: {
    left: number;
    top: number;
  };
  /**
   * 锚点类型。默认为`anchorEl`。
   *
   * @type {('anchorEl' | 'anchorPosition')}
   */
  anchorReference?: 'anchorEl' | 'anchorPosition';
  children?: React.ReactNode;
  /**
   * popover的阴影程度。
   *
   * @type {number=8}
   */
  elevation?: number;
  /**
   * 指定popover能离window的最近距离。默认为16px。
   *
   * @type {number = 16}
   */
  marginThreshold?: number;
  /**
   * 如果设置为true，则显示popover
   *
   * @type {boolean}
   */
  open?: boolean;
  role?: string;
  /**
   * 指定CSS3 transform的变换原点。
   *
   * @type {({
   *     horizontal: number | 'left' | 'center' | 'right',
   *     vertical: number | 'left' | 'center' | 'right',
   *   })}
   */
  transformOrigin?: TransitionOrigin;
  /**
   * 指定过渡动画。默认为Grow。
   *
   * @type {(string | Component<*>)}
   */
  transition?: React.ReactType;
  /**
   * 指定过渡动画的时长。
   *
   * @type {number}
   */
  transitionDuration?: number;
  /**
   * 指定paper的属性。
   *
   * @type {Object}
   */
  PaperProps?: object;
  /**
   * 在进入'entering'阶段之前调用的回调函数。
   *
   * @type {(node: HTMLElement, isAppearing: boolean) => void}
   */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * 在设置'entered'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement, isAppearing: boolean) => void}
   */
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * 在设置'entering'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement, isAppearing: boolean) => void}
   */
  onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * 在设置'exiting'状态之前调用的回调函数。
   *
   * @type {(node: HTMLElement) => void}
   */
  onExit?: (node: HTMLElement) => void;
  /**
   * 在设置'exited'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement) => void}
   */
  onExited?: (node: HTMLElement) => void;
  /**
   * 在设置'exiting'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement) => void}
   */
  onExiting?: (node: HTMLElement) => void;
  /**
   * 在组件挂载之后调用的回调函数。通过此回调函数获取到`updatePosition`动作，执行此动作可以更新popover位置。
   *
   * ```javascript
   * let popoverAction;
   * const popover = <Popover action={action => {popoverAction = action;}} />;
   * popoverAction.updatePosition(); // 重新计算popover的位置。
   * ```
   *
   */
  /**
   * 获取popover中作为锚点目标的元素的函数。这个方法与`anchorEl`属性是成对出现的。
   *
   * `contentAnchorEl`会与`anchorEl`在位置上重叠，会让`contentAnchorEl`刚好在`anchorEl`之上。
   *
   * @type {(popoverElement: HTMLElement) => HTMLElement}
   */
  getContentAnchorEl?: (popoverElement?: HTMLElement) => HTMLElement;
  /**
   * 组件请求关闭的回调函数
   *
   */
  onRequestClose?: () => void;
  action?: (param: ActionParam) => void;
  /**
   * 是否有遮罩层
   *
   * @type {boolean}
   * @memberof PopoverProps
   */
  backdrop?: boolean;
  fixed?: boolean;
}

/**
 * 获取CSS3变换原点值。
 *
 * @param {TransitionOrigin} transformOrigin
 */
function getTransformOriginValue(transformOrigin: TransitionOrigin): string {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

function Popover(props: PopoverProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const transitionElRef = useRef(null);
  const paperDomRef = useRef<HTMLElement | null>(null);

  const {
    anchorReference = 'anchorEl',
    anchorOrigin = { vertical: 'top', horizontal: 'left' },
    elevation = 8,
    marginThreshold = 16,
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    transition: TransitionProp = Grow,
    transitionDuration = 'auto',
    anchorEl,
    getContentAnchorEl,
    action,
    onEntered: onEnteredProp,
    anchorPosition,
    children,
    onEnter,
    onEntering,
    onExit,
    onExited,
    onExiting,
    open,
    PaperProps,
    role,
    ...other
  } = props;

  const getContentAnchorOffset = useCallback(
    (element: HTMLElement) => {
      let contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        const contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && contains(element, contentAnchorEl)) {
          const scrollTop = getScrollTop(element, contentAnchorEl);
          contentAnchorOffset =
            contentAnchorEl.offsetTop +
              contentAnchorEl.clientHeight / 2 -
              scrollTop || 0;
        }
      }

      return contentAnchorOffset;
    },
    [anchorReference, getContentAnchorEl],
  );

  /**
   * 获取元素的位置信息
   */
  const getPositioningStyle = useCallback(
    (element) => {
      const windowRect = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const anchorRect = (anchorEl || document.body).getBoundingClientRect();
      const targetRect = element.getBoundingClientRect();

      const {
        top,
        left,
        transformOrigin: newTransitionOrigin,
      } = new PopoverPosition(
        anchorOrigin as any,
        transformOrigin as any,
        marginThreshold,
      ).getPosition(
        windowRect,
        anchorRect,
        targetRect,
        getContentAnchorOffset(element),
      );

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(newTransitionOrigin),
      };
    },
    [
      anchorEl,
      anchorOrigin,
      getContentAnchorOffset,
      marginThreshold,
      transformOrigin,
    ],
  );

  /**
   * 定位元素
   */
  const setPositioningStyles = useCallback(
    (element: HTMLElement) => {
      if (element && element.style) {
        const positioning = getPositioningStyle(element);
        element.style.top = positioning.top;
        element.style.left = positioning.left;
        element.style.transformOrigin = positioning.transformOrigin;
      }
    },
    [getPositioningStyle],
  );

  const handleResize: (() => void) & { cancel: () => void } = debounce(() => {
    // eslint-disable-next-line react/no-find-dom-node
    const element = transitionElRef.current;
    setPositioningStyles(element as any);
  }, 166);

  const syncPaperStyle = useCallback(() => {
    const content$ = contentRef.current;

    if (content$ && paperDomRef.current) {
      const { height } = content$.getBoundingClientRect();
      const {
        height: paperHeight,
      } = paperDomRef.current.getBoundingClientRect();

      if (height > paperHeight) {
        paperDomRef.current.style.bottom = '0px';
      }
    }
  }, []);

  useEffect(() => {
    if (action) {
      action({ updatePosition: handleResize });
    }

    syncPaperStyle();

    return () => handleResize.cancel();
  }, [action, handleResize, syncPaperStyle]);

  const handleEnter = useCallback(
    (element, isAppearing) => {
      if (props.onEnter) {
        props.onEnter(element, isAppearing);
      }

      setPositioningStyles(element);
    },
    [props, setPositioningStyles],
  );

  const onMouseUp = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const onPaperRef = (paperDom: HTMLElement) => {
    if (paperDom && paperDomRef.current !== paperDom) {
      if (paperDomRef.current) {
        paperDomRef.current.removeEventListener('mouseup', onMouseUp, true);
      }
      paperDomRef.current = paperDom;
      paperDomRef.current.addEventListener('mouseup', onMouseUp, true);
    }
    if (!paperDom && paperDomRef.current) {
      paperDomRef.current.removeEventListener('mouseup', onMouseUp, true);
    }
  };

  const onEntered = useCallback(
    (node: HTMLElement, isAppearing: boolean) => {
      syncPaperStyle();

      if (onEnteredProp) {
        onEnteredProp(node, isAppearing);
      }
    },
    [onEnteredProp, syncPaperStyle],
  );

  const transitionProps: any = {
    timeout: null,
  };

  if (TransitionProp === Grow) {
    transitionProps.timeout = transitionDuration;
  }

  return (
    <Modal
      open={open}
      BackdropProps={{ visible: false }}
      {...other}
      zIndex={zIndex.popover}
    >
      <TransitionProp
        appear
        in={open}
        onEnter={handleEnter}
        onEntered={onEntered}
        onEntering={onEntering}
        onExit={onExit}
        onExited={onExited}
        onExiting={onExiting}
        role={role}
        ref={transitionElRef}
        {...transitionProps}
      >
        <PopoverLayout ref={onPaperRef}>
          <EventListener target="window" onResize={handleResize} />

          <PopoverContent
            fullWidth
            elevation={elevation}
            {...PaperProps}
            ref={contentRef}
          >
            {children}
          </PopoverContent>

          <Iframe frameBorder={0} scrolling="false" absolute />
        </PopoverLayout>
      </TransitionProp>
    </Modal>
  );
}

export default Popover;
