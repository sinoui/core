import { transitions } from '@sinoui/theme';
import createStyleTransition, {
  TransitionInterface,
} from './createStyleTransition';

function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

export function getEnterTransition(
  instance: TransitionInterface,
  node: HTMLElement,
) {
  const duration = instance.getTimeout(node);
  const enterDuration = duration ? duration.enter : 300;
  return [
    transitions.create('opacity', {
      duration: enterDuration,
    }),
    transitions.create('transform', {
      duration: enterDuration * 0.666,
    }),
  ].join(',');
}

export function getExitTransition(
  instance: TransitionInterface,
  node: HTMLElement,
) {
  const duration = instance.getTimeout(node);
  const exitDuration = duration ? duration.exit : 300;

  return [
    transitions.create('opacity', {
      duration: exitDuration,
    }),
    transitions.create('transform', {
      duration: exitDuration * 0.666,
      delay: exitDuration * 0.333,
    }),
  ].join(',');
}

const defaultProps: {
  timeout?:
    | 'auto'
    | number
    | {
        enter: number;
        exit: number;
      };
} = {
  timeout: 'auto',
};

/**
 * 增大、缩小的过渡效果。
 *
 * ```javascript
 * import React from 'react';
 * import Grow from 'sinoui-components/transitions/Grow';
 * import { TransitionInterface } from './createStyleTransition';
 *
 * class GrowDemo extends React.Component {
 *  state: {
 *    in: false,
 *  };
 *
 *  handleButtonClick = () => this.setState(prevState => ({ !prevState.in}));
 *
 *  render() {
 *    return <div>
 *      <button onClick={this.handleButtonClick}>切换Grow动画</button>
 *      <Grow in={this.state.in}>这是应用动画的内容</Grow>
 *    </div>
 *  }
 * }
 * ```
 *
 * 增大：
 *
 * * opacity: 0 -> 1
 * * scaleX: 0.75 -> 1
 * * scaleY: 0.5625 -> 1
 *
 * 缩小：
 *
 * * opacity: 1 -> 0
 * * scaleX: 1 -> 0.75
 * * scaleY: 1 -> 0.5625
 */
const Grow = createStyleTransition(
  {
    enterStyle: () => ({
      opacity: 0,
      transform: getScale(0.75),
    }),
    enterActiveStyle: (instance, node) => ({
      transition: getEnterTransition(instance, node),
    }),
    enterToStyle: () => ({
      opacity: 1,
      transform: getScale(1),
    }),
    exitStyle: () => ({
      opacity: 1,
      transform: getScale(1),
    }),
    exitActiveStyle: (instance, node) => ({
      transition: getExitTransition(instance, node),
    }),
    exitToStyle: () => ({
      opacity: 0,
      transform: getScale(0.75),
    }),
  },
  defaultProps,
);

export default Grow;
