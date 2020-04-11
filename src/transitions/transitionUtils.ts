export interface TransitionTimeout {
  enter: number;
  exit: number;
}

export interface TransitionEasing {
  enter: string;
  exit: string;
}

/**
 * 获取过渡时长
 *
 * @param {(number | {
 *  enter: number,
 *   exit: number,
 * })} timeout
 * @param {({
 *   enter: number,
 *   exit: number,
 * })} defaultTimeout
 */
export function getDuration(
  timeout?: number | TransitionTimeout,
  defaultTimeout?: TransitionTimeout,
): TransitionTimeout | undefined {
  if (!timeout) {
    return defaultTimeout;
  }
  if (typeof timeout === 'number') {
    return {
      enter: timeout,
      exit: timeout,
    };
  }
  return timeout;
}

/**
 * 获取过渡效果的缓动函数
 *
 * @param {(string | TransitionEasing)} easing
 * @param {TransitionEasing} defaultEasing
 */
export function getEasing(
  easing?: string | TransitionEasing,
  defaultEasing?: TransitionEasing,
): TransitionEasing | undefined {
  if (!easing) {
    return defaultEasing;
  }
  if (typeof easing === 'string') {
    return {
      enter: easing,
      exit: easing,
    };
  }
  return easing;
}
