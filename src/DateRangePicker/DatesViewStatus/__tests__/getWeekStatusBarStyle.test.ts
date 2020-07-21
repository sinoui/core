import getWeekStatusBarStyle, {
  getWeekStatusBarHeight,
  getWeekStatusBarWidth,
  getWeekStatusBarLeft,
  getWeekStatusBarTop,
  getWeekStatusBarBorderRadius,
} from '../getWeekStatusBarStyle';

it('获取周状态条高度', () => {
  expect(getWeekStatusBarHeight()).toBe(28);
});

it('获取周状态条的宽度', () => {
  expect(getWeekStatusBarWidth([2, 4])).toBe('calc(28.5714% + 28px)');
});

it('获取周状态的水平位置', () => {
  expect(getWeekStatusBarLeft(2)).toBe('calc(28.5714% + 2px)');
});

it('获取周状态条的垂直位置', () => {
  expect(getWeekStatusBarTop(2)).toBe(66);
});

it('获取周状态条的边框半径', () => {
  expect(getWeekStatusBarBorderRadius()).toBe(14);
});

it('获取周状态条样式', () => {
  expect(getWeekStatusBarStyle([2, 4], 1)).toEqual({
    width: 'calc(28.5714% + 28px)',
    height: 28,
    borderRadius: 14,
    left: 'calc(28.5714% + 2px)',
    top: 34,
  });
});
