import * as React from 'react';
import { transitions } from '@sinoui/theme';
import createStyleTransition from './createStyleTransition';
import { BaseTransitionCompProps } from './type';

const { duration } = transitions;

export interface SlidePropsType extends BaseTransitionCompProps {
  appear?: boolean;
  in?: boolean;
  /**
   * 过渡效果的方向
   */
  direction?: 'up' | 'down';
  /**
   * 子节点
   */
  children?: React.ReactNode;
  /**
   * 过渡时长。
   */
  timeout?:
    | number
    | {
        enter: number;
        exit: number;
      };
  /**
   * 指定过渡时应用的css类名。
   */
  transitionClasses?:
    | string
    | {
        appear?: string;
        appearActive?: string;
        enter?: string;
        enterActive?: string;
        exit?: string;
        exitActive?: string;
      };
  /**
   * 过渡效果的缓动函数
   */
  easing?:
    | string
    | {
        enter: string;
        exit: string;
      };
}

// Slide效果默认的缓动函数
const SLIDE_EASING = {
  enter: 'cubic-bezier(0.23, 1, 0.32, 1)',
  exit: 'cubic-bezier(0.23, 1, 0.32, 1)',
};

// Slide效果默认的过渡时长
const TRANSITION_DURATION = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

/**
 * 水平滑动效果。内部使用
 * [react-transition-group/CSSTransition](https://reactcommunity.org/react-transition-group/#CSSTransition)实现过渡效果。
 */
const Slide: React.ComponentType<SlidePropsType | any> = createStyleTransition({
  enterStyle: ({ props }) => ({
    transform:
      props.direction === 'up' ? 'translate(0px, 100%)' : 'translateY(0px)',
    opacity: 0.01,
  }),
  enterToStyle: ({ props }) => ({
    transform:
      props.direction === 'down' ? 'translate(0px, 100%)' : 'translateY(0px)',
    opacity: 1,
  }),
  exitStyle: ({ props }) => ({
    opacity: 1,
    transform:
      props.direction === 'up'
        ? 'translate3d(0px, 0px, 0px)'
        : 'translate(0px, 100%)',
  }),
  exitToStyle: ({ props }) => ({
    transform:
      props.direction === 'down'
        ? 'translate3d(0px, 0px, 0px)'
        : 'translate(0px, 100%)',
    opacity: 0.01,
  }),
  transitionProps: ['transform', 'opacity'],
  easing: SLIDE_EASING,
  duration: TRANSITION_DURATION,
});

export default Slide;
