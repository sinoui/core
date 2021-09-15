/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import transitions, { duration } from '@sinoui/theme/transitions';
import type { TransitionStatus } from 'react-transition-group/Transition';
import type BaseTransitionProps from '../transitions/BaseTransitionProps';
import useMultiRefs from '../utils/useMultiRefs';

const styles: {
  [status: string]: React.CSSProperties;
} = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

/**
 * 淡入淡出过渡效果。
 */
const Fade = React.forwardRef<HTMLElement, BaseTransitionProps>(
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
      node.style.transition = transitions.create('opacity', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter,
      });

      if (onEnter) {
        onEnter(node, isAppear);
      }
    };

    /**
     * 退出过渡的回调函数。需要在此时给节点添加上退出动画的`css transition`。
     *
     * @param node 应用过渡的节点
     */
    const handleExit: any = () => {
      const node = contentRef.current;
      if (!node) {
        return;
      }
      node.style.transition = transitions.create('opacity', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit,
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
              opacity: 0,
              visibility: status === 'exited' && !inProp ? 'hidden' : undefined,
              ...children.props.style,
              ...childProps.sytle,
              ...styles[status],
            },
          })
        }
      </Transition>
    );
  },
);

export default Fade;
