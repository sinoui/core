/* eslint-disable no-param-reassign */
import React from 'react';
import { Transition } from 'react-transition-group';
import transitions, { duration } from '@sinoui/theme/transitions';
import type { TransitionStatus } from 'react-transition-group/Transition';
import BaseTransitionProps from '../transitions/BaseTransitionProps';
import useMultiRefs from '../utils/useMultiRefs';

type Direction = 'down' | 'up' | 'left' | 'right';

type Props = BaseTransitionProps & {
  /**
   * 指定元素平移出现的方向。默认为`down`。
   */
  direction?: Direction;
};

const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

export function getTranslate(node: HTMLElement, direction: Direction) {
  const rect = node.getBoundingClientRect();

  switch (direction) {
    case 'left':
      return `translateX(${window.innerWidth - rect.left}px)`;
    case 'right':
      return `translateX(-${rect.left + rect.width}px)`;
    case 'down':
      return `translateY(-${rect.top + rect.height}px)`;
    case 'up':
    default:
      return `translateY(${window.innerHeight - rect.top}px)`;
  }
}

/**
 * 重排元素。
 *
 * 调用此方法，浏览器会立马应用新的css样式。
 *
 * **注意**：此方法会引起全局重排，所以慎用。
 *
 * @param node 元素
 */
const reflow = (node: HTMLElement) => node.scrollTop;

/**
 * 从屏幕边缘平移滑动的过渡效果。
 */
const Slide = React.forwardRef<HTMLElement, Props>(function Slide(props, ref) {
  const {
    direction = 'down',
    children,
    in: inProp,
    timeout = defaultTimeout,
    onEnter,
    onEntering,
    onExit,
    onExited,
    ...rest
  } = props;

  const handleRef = useMultiRefs(ref, (children as any).ref);

  /**
   * 进入过渡的初始化回调函数。在初始化步骤需要将元素设置到屏幕外部。
   *
   * @param node 节点
   * @param isAppearing 指示进场动画是否触发在初始挂载时
   */
  const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    node.style.transform = getTranslate(node, direction);
    reflow(node); // 修复初始化隐藏到展现时无过渡的缺陷
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  /**
   * 进入过渡的开始回调函数。在开始步骤中设置过渡效果，并让元素出现在之前的位置。
   *
   * @param node 节点
   * @param isAppearing 指示进场动画是否触发在初始挂载时
   */
  const handleEntering = (node: HTMLElement, isAppearinging: boolean) => {
    node.style.transition = transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
      easing: transitions.easing.easeOut,
    });
    node.style.transform = 'none';
    if (onEntering) {
      onEntering(node, isAppearinging);
    }
  };

  /**
   * 退出过渡的回调函数。需要将元素设置到屏幕之外，并设置过渡效果。
   *
   * @param node 节点
   */
  const handleExit = (node: HTMLElement) => {
    node.style.transition = transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
      easing: transitions.easing.sharp,
    });
    node.style.transform = getTranslate(node, direction);
    if (onExit) {
      onExit(node);
    }
  };

  /**
   * 退出过渡的完成回调函数。需要在过渡结束时清除过渡效果。
   * @param node 节点
   */
  const handleExited = (node: HTMLElement) => {
    node.style.transition = 'none';
    node.style.transform = 'none';
    if (onExited) {
      onExited(node);
    }
  };

  return (
    <Transition
      appear
      in={inProp}
      timeout={timeout}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      {...rest}
    >
      {(status: TransitionStatus, childProps: any) =>
        React.cloneElement(children, {
          ref: handleRef,
          ...childProps,
          style: {
            visibility: status === 'exited' && !inProp ? 'hidden' : undefined,
            ...childProps.style,
            ...children.props.style,
          },
        })
      }
    </Transition>
  );
});

export default Slide;
