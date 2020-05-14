/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import transitions from '@sinoui/theme/transitions';
import type { TransitionStatus } from 'react-transition-group/Transition';
import type BaseTransitionProps from '../transitions/BaseTransitionProps';
import getDuration from '../transitions/getDuration';
import type { TransitionTimeout } from '../transitions/getDuration';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoTimeout = useRef<number>(0);
  const timerRef = useRef<number>();

  const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    node.style.height = `${collapsedHeight}px`;
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleEntering = (node: HTMLElement, isAppearing: boolean) => {
    const wrapper = wrapperRef.current;
    const duration = getDuration(timeout, 'enter', wrapper);
    node.style.transitionDuration = `${duration}ms`;
    node.style.height = `${wrapper?.clientHeight ?? 0}px`;
    autoTimeout.current = timeout === 'auto' ? duration : 0;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  };

  const handleEntered = (node: HTMLElement, isAppearing: boolean) => {
    node.style.height = 'auto';
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  };

  const handleExit = (node: HTMLElement) => {
    node.style.height = `${wrapperRef.current?.clientHeight ?? 0}px`;
    reflow(node);
    if (onExit) {
      onExit(node);
    }
  };

  const handleExiting = (node: HTMLElement) => {
    const wrapper = wrapperRef.current;
    const duration = getDuration(timeout, 'exit', wrapper);
    node.style.transitionDuration = `${duration}ms`;
    autoTimeout.current = timeout === 'auto' ? duration : 0;
    node.style.height = `${collapsedHeight}px`;

    if (onExiting) {
      onExiting(node);
    }
  };

  const addEndListener = (_: HTMLElement, done: () => void) => {
    timerRef.current = setTimeout(done, autoTimeout.current);
  };

  useEffect(() => {
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
      {...rest}
    >
      {(status: TransitionStatus, childProps: any) => (
        <CollapseWrapper
          $entered={status === 'entered'}
          $hidden={status === 'exited' && !inProp && collapsedHeight === 0}
          $minHeight={collapsedHeight}
          ref={ref}
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
