/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import transitions from '@sinoui/theme/transitions';
import type { TransitionStatus } from 'react-transition-group/Transition';
import { animate } from '@sinoui/utils';
import type BaseTransitionProps from '../transitions/BaseTransitionProps';
import getDuration from '../transitions/getDuration';
import type { TransitionTimeout } from '../transitions/getDuration';
import useMultiRefs from '../utils/useMultiRefs';

interface CollapseWrapperProps {
  $hidden?: boolean;
}

const CollapseWrapper = styled.div<CollapseWrapperProps>`
  overflow: hidden;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : '')};
  transform-origin: top left;

  & > div {
    display: flex;
    transform-origin: top left;
    will-change: transform;
  }
`;

type Props = Omit<BaseTransitionProps, 'timeout'> & {
  /**
   * 压缩后的高度。默认为`0`。单位为`px`。
   */
  collapsedHeight?: number;
  timeout?: TransitionTimeout;
  /**
   * 收缩方向，auto表示垂直和水平方向同时收缩
   */
  direction?: 'vertical' | 'horizontal' | 'auto';
};

/**
 * 压缩元素的过渡效果。
 */
const Collapse = React.forwardRef<HTMLDivElement, Props>(function Collapse(
  props,
  ref,
) {
  const {
    children,
    timeout = transitions.duration.standard,
    in: inProp,
    collapsedHeight = 0,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    direction = 'vertical',
    ...rest
  } = props;
  const contentRef = useRef<HTMLElement>(null);
  const handleContentRef = useMultiRefs(contentRef, ref);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoTimeout = useRef<number>(0);
  const timerRef = useRef<number>();
  const enterAnimateRef = useRef<any>(null);
  const exitAnimateRef = useRef<any>(null);
  const inRef = useRef<boolean>(!!inProp);

  const handleEnter: any = (isAppearing: boolean) => {
    const node = contentRef.current;
    const content = wrapperRef.current;
    if (!node || !content) {
      return;
    }
    const start = collapsedHeight / content.clientHeight;

    enterAnimateRef.current = animate(start, 1, 200, (value) => {
      const scaleX = direction === 'vertical' ? 1 : value;
      const scaleY = direction === 'horizontal' ? 1 : value;
      const invScaleX = scaleX === 0 ? 60 : 1 / scaleX;
      const invScalY = scaleY === 0 ? 60 : 1 / scaleY;
      node.style.transform = `scale(${scaleX}, ${scaleY})`;
      content.style.transform = `scale(${invScaleX}, ${invScalY})`;
    });

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleEntering: any = (isAppearing: boolean) => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    const wrapper = wrapperRef.current;
    const duration = getDuration(timeout, 'enter', wrapper);
    autoTimeout.current = timeout === 'auto' ? duration : 0;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  };

  const handleEntered: any = (isAppearing: boolean) => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    enterAnimateRef.current();
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  };

  const handleExit = () => {
    const node = contentRef.current;
    const content = wrapperRef.current;
    if (!node || !content) {
      return;
    }
    const end = collapsedHeight / content.clientHeight;
    exitAnimateRef.current = animate(1, end, 200, (value) => {
      const scaleX = direction === 'vertical' ? 1 : value;
      const scaleY = direction === 'horizontal' ? 1 : value;
      const invScaleX = scaleX === 0 ? 60 : 1 / scaleX;
      const invScalY = scaleY === 0 ? 60 : 1 / scaleY;
      node.style.transform = `scale(${scaleX}, ${scaleY})`;
      content.style.transform = `scale(${invScaleX}, ${invScalY})`;
    });

    if (onExit) {
      onExit(node);
    }
  };

  const handleExiting = () => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    const wrapper = wrapperRef.current;
    const duration = getDuration(timeout, 'exit', wrapper);

    autoTimeout.current = timeout === 'auto' ? duration : 0;

    if (onExiting) {
      onExiting(node);
    }
  };

  const handleExited = () => {
    exitAnimateRef.current();
  };

  const addEndListener: any = (done: () => void) => {
    timerRef.current = setTimeout(done, autoTimeout.current);
  };

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  useLayoutEffect(() => {
    if (!inRef.current) {
      const node = contentRef.current;
      const content = wrapperRef.current;
      if (!node || !content) {
        return;
      }

      const scaleY = collapsedHeight / content.clientHeight;
      const invScalY = scaleY === 0 ? 60 : 1 / scaleY;

      node.style.transform = `scale(1,${scaleY})`;
      content.style.transform = `scale(1,${invScalY})`;
    }
  }, [collapsedHeight]);

  return (
    <Transition
      appear
      in={inProp}
      timeout={timeout === 'auto' ? undefined : timeout}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
      addEndListener={(timeout === 'auto' ? addEndListener : undefined) as any}
      nodeRef={wrapperRef}
      {...rest}
    >
      {(status: TransitionStatus, childProps: any) => (
        <CollapseWrapper
          className="sinoui-collapse-container"
          $hidden={status === 'exited' && !inProp && collapsedHeight === 0}
          ref={handleContentRef}
          {...childProps}
        >
          <div ref={wrapperRef} className="sinoui-collapse-content">
            {children}
          </div>
        </CollapseWrapper>
      )}
    </Transition>
  );
});

export default Collapse;
