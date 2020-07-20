import animate from './animate';

jest.useFakeTimers();

const raf = window.requestAnimationFrame;
const cancelRaf = window.cancelAnimationFrame;
const { now } = Date;

beforeEach(() => {
  window.requestAnimationFrame = (callback: Function) => {
    return setTimeout(callback);
  };
  window.cancelAnimationFrame = (rafId: number) => {
    clearTimeout(rafId);
  };

  Date.now = jest.fn();
  (Date.now as jest.Mock).mockReturnValueOnce(0);
  (Date.now as jest.Mock).mockReturnValueOnce(16);
  (Date.now as jest.Mock).mockReturnValueOnce(32);
  (Date.now as jest.Mock).mockReturnValueOnce(48);
  (Date.now as jest.Mock).mockReturnValueOnce(64);
  (Date.now as jest.Mock).mockReturnValueOnce(80);
  (Date.now as jest.Mock).mockReturnValueOnce(96);
  (Date.now as jest.Mock).mockReturnValueOnce(112);
});

afterEach(() => {
  window.requestAnimationFrame = raf;
  window.cancelAnimationFrame = cancelRaf;
  Date.now = now;
});

it('运行动画', () => {
  const frameCallback = jest.fn();
  animate(100, frameCallback);

  jest.runAllTimers();

  expect(frameCallback).toBeCalledTimes(7);
  expect(frameCallback.mock.calls[0][0](0, 1)).toBeGreaterThan(0);
  expect(frameCallback.mock.calls[1][0](0, 1)).toBeGreaterThan(0);
  expect(frameCallback.mock.calls[6][0](0, 1)).toBeCloseTo(1);
});

it('取消动画', () => {
  const frameCallback = jest.fn();
  const cancel = animate(100, frameCallback);
  const spy = jest.spyOn(window, 'cancelAnimationFrame');

  cancel();

  jest.runAllTimers();

  expect(frameCallback).toBeCalledTimes(1);
  expect(spy).toBeCalledTimes(1);

  // 再次调用取消函数，不会再调用cancelAnimationFrame
  cancel();
  expect(spy).toBeCalledTimes(1);
});
