import * as React from 'react';
import { transitions } from '@sinoui/theme';
import createStyleTransition from './createStyleTransition';
import { BaseTransitionCompProps } from './type';

const { duration } = transitions;

export interface HorizontalSlidePropsType extends BaseTransitionCompProps {
  /**
   * 过渡效果的方向
   */
  direction: 'left' | 'right';
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
const HorizontalSlide: React.ComponentType<
  HorizontalSlidePropsType | any
> = createStyleTransition({
  enterStyle: (transition) => ({
    transform: `translate(${
      transition.props.direction === 'right' ? '-' : ''
    }100%, 0px)`,
    opacity: 0.01,
  }),
  enterToStyle: () => ({
    transform: 'translateX(0px)',
    opacity: 1,
  }),
  exitStyle: () => ({
    opacity: 1,
    transform: 'translate3d(0px, 0px, 0px)',
  }),
  exitToStyle: (transition) => ({
    transform: `translate(${
      transition.props.direction === 'right' ? '-' : ''
    }100%, 0px)`,
    opacity: 0.01,
  }),
  transitionProps: ['transform', 'opacity'],
  easing: SLIDE_EASING,
  duration: TRANSITION_DURATION,
});

export default HorizontalSlide;
