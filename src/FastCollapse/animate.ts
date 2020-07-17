import easeInOut from './easeInOut';

/**
 * 过渡动画
 *
 * @param duration 动画时长
 * @param frameCallback 每一帧都会执行的回调函数
 */
export default function animate(
  duration: number,
  frameCallback: (getValue: (start: number, end: number) => number) => void,
) {
  const startTime = Date.now();
  let rafId = -1;

  const tick = () => {
    const elapsed = Math.min(duration, Date.now() - startTime);
    frameCallback((start: number, end: number) =>
      easeInOut(elapsed, start, end - start, duration),
    );

    if (elapsed < duration) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = -1;
    }
  };

  tick();

  return () => {
    if (rafId !== -1) {
      cancelAnimationFrame(rafId);
      rafId = -1;
    }
  };
}
