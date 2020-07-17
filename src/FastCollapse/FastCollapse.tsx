/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import transitions from '@sinoui/theme/transitions';
import type { TransitionStatus } from 'react-transition-group/Transition';
import animate from './animate';
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
  backface-visibility: hidden; /* 兼容 IE11，启用GPU加速 */
  will-change: transform;

  & > div {
    transform-origin: top left;
    backface-visibility: hidden; /* 兼容 IE11，启用GPU加速 */
    will-change: transform;
  }
`;

type Props = Omit<BaseTransitionProps, 'timeout'> & {
  /**
   * 压缩后的高度。默认为`0`。单位为`px`。
   */
  collapsedHeight?: number;
  /**
   * 压缩后的宽度。默认为`0`。单位为`px`。
   */
  collapsedWidth?: number;
  /**
   * 指定动画时长。如果指定为`auto`，则会根据实际高度来计算时长。
   */
  timeout?: TransitionTimeout;
  /**
   * 收缩方向，`both`表示垂直和水平方向同时收缩
   */
  direction?: 'vertical' | 'horizontal' | 'both';
};

/**
 * 压缩元素的过渡效果。
 *
 * FastCollapse组件适合用于弹窗的动效。如果需要压缩的是布局中的元素，则需要使用Collapse组件。
 *
 * 实现思路参考： https://developers.google.com/web/updates/2017/03/performant-expand-and-collapse
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
    collapsedWidth = 0,
    onEnter,
    onExit,
    direction = 'vertical',
    ...rest
  } = props;
  const contentRef = useRef<HTMLElement>(null);
  const handleContentRef = useMultiRefs(contentRef, ref);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoTimeout = useRef<number>(0);
  const timerRef = useRef<number>();
  const cancelAnimateRef = useRef<Function | null>(null);
  const inRef = useRef<boolean>(!!inProp);

  /**
   * 处理动画
   *
   * @param status 状态
   */
  const handleAnimate = (status: 'enter' | 'exit') => {
    const node = contentRef.current;
    const content = wrapperRef.current;
    if (!node || !content) {
      return;
    }
    const duration = getDuration(timeout, status, content);
    autoTimeout.current = timeout === 'auto' ? duration : 0;
    const initX =
      direction === 'vertical' ? 1 : collapsedWidth / content.clientWidth;
    const initY =
      direction === 'horizontal' ? 1 : collapsedHeight / content.clientHeight;
    const start = {
      x: status === 'enter' ? initX : 1,
      y: status === 'enter' ? initY : 1,
    };
    const end = {
      x: status === 'enter' ? 1 : initX,
      y: status === 'enter' ? 1 : initY,
    };

    // eslint-disable-next-line no-unused-expressions
    cancelAnimateRef.current?.();

    cancelAnimateRef.current = animate(duration, (interpolation) => {
      const scaleX =
        direction === 'vertical' ? 1 : interpolation(start.x, end.x);
      const scaleY =
        direction === 'horizontal' ? 1 : interpolation(start.y, end.y);
      const invScaleX = scaleX === 0 ? 60 : 1 / scaleX;
      const invScaleY = scaleY === 0 ? 60 : 1 / scaleY;
      node.style.transform = `scale(${scaleX}, ${scaleY})`;
      content.style.transform = `scale(${invScaleX}, ${invScaleY})`;
    });
  };

  const handleEnter: any = (isAppearing: boolean) => {
    handleAnimate('enter');

    const node = contentRef.current;
    if (onEnter && node) {
      onEnter(node, isAppearing);
    }
  };

  const handleExit = () => {
    handleAnimate('exit');

    const node = contentRef.current;
    if (onExit && node) {
      onExit(node);
    }
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

      const scaleX =
        direction === 'vertical' ? 1 : collapsedWidth / content.clientWidth;
      const scaleY =
        direction === 'horizontal' ? 1 : collapsedHeight / content.clientHeight;

      const invScaleX = scaleX === 0 ? 60 : 1 / scaleX;
      const invScaleY = scaleY === 0 ? 60 : 1 / scaleY;

      node.style.transform = `scale(${scaleX}, ${scaleY})`;
      content.style.transform = `scale(${invScaleX}, ${invScaleY})`;
    }
  }, [collapsedHeight, collapsedWidth, direction]);

  return (
    <Transition
      appear
      in={inProp}
      timeout={timeout === 'auto' ? undefined : timeout}
      onEnter={handleEnter}
      onExit={handleExit}
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
