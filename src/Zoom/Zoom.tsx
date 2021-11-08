/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import transitions, { duration } from '@sinoui/theme/transitions';
import type { TransitionStatus } from 'react-transition-group/Transition';
import type BaseTransitionProps from '../transitions/BaseTransitionProps';
import useMultiRefs from '../utils/useMultiRefs';
import getDuration from '../transitions/getDuration';

const styles: {
  [status: string]: React.CSSProperties;
} = {
  entering: {
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
};

const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

/**
 * 放大过渡效果。
 *
 * 从子元素的中心向外扩展。
 */
const Zoom = React.forwardRef<HTMLElement, BaseTransitionProps>(
  (props, ref) => {
    const {
      in: inProp,
      children,
      timeout = defaultTimeout,
      onEnter,
      onExit,
      ...rest
    } = props;
    const contentRef = useRef<HTMLElement>(null);
    const handleRef = useMultiRefs(contentRef, ref, (children as any).ref);
    /**
     * 进入过渡的回调函数，需要在此时给节点添加上入场动画的`css transition`。
     *
     * @param isAppear 指示进场动画是否触发在初始挂载时
     */
    const handleEnter: any = (isAppear: boolean) => {
      const node = contentRef.current;
      if (!node) {
        return;
      }
      node.style.transition = transitions.create('transform', {
        duration: getDuration(timeout, 'enter'),
      });

      if (onEnter) {
        onEnter(node, isAppear);
      }
    };

    /**
     * 退出过渡的回调函数。需要在此时给节点添加上退出动画的`css transition`。
     */
    const handleExit = () => {
      const node = contentRef.current;
      if (!node) {
        return;
      }
      node.style.transition = transitions.create('transform', {
        duration: getDuration(timeout, 'exit'),
      });

      if (onExit) {
        onExit(node);
      }
    };

    return (
      <Transition
        appear
        in={inProp}
        timeout={timeout}
        onEnter={handleEnter}
        onExit={handleExit}
        nodeRef={contentRef}
        {...rest}
      >
        {(status: TransitionStatus, childProps: any) =>
          React.cloneElement(children, {
            ref: handleRef,
            ...childProps,
            style: {
              transform: 'scale(0)',
              visibility: status === 'exited' && !inProp ? 'hidden' : undefined,
              ...children.props.style,
              ...childProps.style,
              ...styles[status],
            },
          })
        }
      </Transition>
    );
  },
);

Zoom.displayName = 'Zoom';

export default Zoom;
