import { transitions } from '@sinoui/theme';
import createStyleTransition from './createStyleTransition';

const { duration, easing } = transitions;

// 默认的过渡时长
const TRANSITION_DURATION = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

/**
 * 淡入淡出效果。内部使用
 * [react-transition-group/CSSTransition](https://reactcommunity.org/react-transition-group/#CSSTransition)实现过渡效果。
 */
const Fade = createStyleTransition({
  enterStyle: () => ({
    opacity: 0,
  }),
  enterToStyle: () => ({
    opacity: 1,
  }),
  exitStyle: () => ({
    opacity: 1,
  }),
  exitToStyle: () => ({
    opacity: 0,
  }),
  transitionProps: ['opacity'],
  duration: TRANSITION_DURATION,
  easing: {
    enter: easing.easeInOut,
    exit: easing.easeInOut,
  },
});

export default Fade;
