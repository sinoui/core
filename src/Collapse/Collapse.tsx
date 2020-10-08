/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import transitions from '@sinoui/theme/transitions';
import type { TransitionStatus } from 'react-transition-group/Transition';
import type BaseTransitionProps from '../transitions/BaseTransitionProps';
import getDuration from '../transitions/getDuration';
import type { TransitionTimeout } from '../transitions/getDuration';
import useMultiRefs from '../utils/useMultiRefs';

interface CollapseWrapperProps {
  $entered?: boolean;
  $hidden?: boolean;
  $minHeight: number;
}

const CollapseWrapper = styled.div<CollapseWrapperProps>`
  height: ${({ $entered }) => ($entered ? 'auto' : '0px')};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.create('height')};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : '')};
  min-height: ${({ $minHeight }) => $minHeight}px;

  & > div {
    display: flex;
    > div {
      width: 100%;
    }
  }
`;

type Props = Omit<BaseTransitionProps, 'timeout'> & {
  /**
   * 压缩后的高度。默认为`0`。单位为`px`。
   */
  collapsedHeight?: number;
  timeout?: TransitionTimeout;
};

const reflow = (node: HTMLElement) => node.offsetTop;

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
    ...rest
  } = props;
  const contentRef = useRef<HTMLElement>(null);
  const handleContentRef = useMultiRefs(contentRef, ref);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoTimeout = useRef<number>(0);
  const timerRef = useRef<number>();

  const handleEnter: any = (isAppearing: boolean) => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    node.style.height = `${collapsedHeight}px`;
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
    node.style.transitionDuration = `${duration}ms`;
    node.style.height = `${wrapper?.clientHeight ?? 0}px`;
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
    node.style.height = 'auto';
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  };

  const handleExit = () => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    node.style.height = `${wrapperRef.current?.clientHeight ?? 0}px`;
    reflow(node);
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
    node.style.transitionDuration = `${duration}ms`;
    autoTimeout.current = timeout === 'auto' ? duration : 0;
    node.style.height = `${collapsedHeight}px`;

    if (onExiting) {
      onExiting(node);
    }
  };

  const addEndListener: any = (done: () => void) => {
    timerRef.current = setTimeout(done, autoTimeout.current);
  };

  useLayoutEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

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
      addEndListener={(timeout === 'auto' ? addEndListener : undefined) as any}
      nodeRef={wrapperRef}
      {...rest}
    >
      {(status: TransitionStatus, childProps: any) => (
        <CollapseWrapper
          $entered={status === 'entered'}
          $hidden={status === 'exited' && !inProp && collapsedHeight === 0}
          $minHeight={collapsedHeight}
          ref={handleContentRef}
          {...childProps}
        >
          <div ref={wrapperRef}>
            <div>{children}</div>
          </div>
        </CollapseWrapper>
      )}
    </Transition>
  );
});

export default Collapse;
