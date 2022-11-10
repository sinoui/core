/* eslint-disable no-param-reassign */
import { transitions } from '@sinoui/theme';
import React, { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

import type BaseTransitionProps from '../transitions/BaseTransitionProps';
import getDuration from '../transitions/getDuration';
import useMultiRefs from '../utils/useMultiRefs';

type TransitionTimeout = BaseTransitionProps['timeout'] | 'auto';

const styles: { [status: string]: React.CSSProperties } = {
  entering: {
    opacity: 1,
    transform: 'scale(1, 1)',
  },
  entered: {
    opacity: 1,
    transform: 'none',
  },
};

/**
 * 扩张过渡效果：从子元素的中心向外扩展，同时从透明淡入至不透明。
 *
 * Grow组件默认根据元素高度计算过渡时长。
 *
 */
const Grow = React.forwardRef<
  HTMLElement,
  Omit<BaseTransitionProps, 'timeout'> & {
    /**
     * 超时时间
     */
    timeout?: TransitionTimeout;
  }
>(function Grow(props, ref) {
  const {
    in: inProp,
    children,
    timeout = 'auto',
    onEnter,
    onExit,
    ...rest
  } = props;
  const contentRef = useRef<HTMLElement>(null);
  const handleRef = useMultiRefs(contentRef, ref, (children as any).ref);
  const autoTimeout = useRef<number>(0);
  const timeoutRef = useRef<number>();
  const childrenRef = useRef(children);

  if (inProp) {
    childrenRef.current = children;
  }

  /**
   * 进入过渡的回调函数，需要在此时给节点添加上入场动画的`css transition`。
   *
   * @param node 应用过渡效果的节点
   * @param isAppear 指示进场动画是否触发在初始挂载时
   */
  const handleEnter: any = (isAppear: boolean) => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    const duration = getDuration(timeout, 'enter', node);
    autoTimeout.current = timeout === 'auto' ? duration : 0;

    node.style.transition = `${transitions.create('opacity', {
      duration,
    })}, ${transitions.create('transform', { duration: duration * 0.666 })}`;
    if (onEnter) {
      onEnter(node, isAppear);
    }
  };

  /**
   * 退出过渡的回调函数。需要在此时给节点添加上退出动画的`css transition`。
   *
   * @param node 应用过渡的节点
   */
  const handleExit = () => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    const duration = getDuration(timeout, 'exit', node);
    autoTimeout.current = timeout === 'auto' ? duration : 0;

    node.style.transition = `${transitions.create('opacity', {
      duration,
    })}, ${transitions.create('transform', {
      duration: duration * 0.666,
      delay: duration * 0.333,
    })}`;
    if (onExit) {
      onExit(node);
    }
  };

  /**
   * 添加过渡结束监听。在此回调函数中处理 `timeout = 'auto'`
   *
   * @param done 过渡完成回调函数
   */
  const addEndListener: any = (done: () => void) => {
    if (timeout === 'auto') {
      timeoutRef.current = setTimeout(done, autoTimeout.current) as any;
    }
  };
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <Transition
      appear
      in={inProp}
      timeout={timeout === 'auto' ? undefined : timeout}
      addEndListener={(timeout === 'auto' ? addEndListener : undefined) as any}
      onEnter={handleEnter}
      onExit={handleExit}
      nodeRef={contentRef}
      {...rest}
    >
      {(status: any, childProps: any) =>
        React.cloneElement(childrenRef.current, {
          ref: handleRef,
          ...childProps,
          style: {
            transform: 'scale(0.75, 0.5625)',
            opacity: 0,
            visibility: status === 'exited' && !inProp ? 'hidden' : undefined,
            ...styles[status],
            ...children.props.style,
            ...childProps.style,
          },
        })
      }
    </Transition>
  );
});

export default Grow;
