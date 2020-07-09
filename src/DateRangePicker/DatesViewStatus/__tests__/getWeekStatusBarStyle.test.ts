import getWeekStatusBarStyle, {
  getWeekStatusBarHeight,
  getWeekStatusBarWidth,
  getWeekStatusBarLeft,
  getWeekStatusBarTop,
  getWeekStatusBarBorderRadius,
} from '../getWeekStatusBarStyle';

it('获取周状态条高度', () => {
  expect(getWeekStatusBarHeight({ width: 10, height: 10, padding: 2 })).toBe(6);
});

it('获取周状态条的宽度', () => {
  expect(
    getWeekStatusBarWidth([new Date(2020, 6, 8), new Date(2020, 6, 10)], {
      width: 32,
      height: 32,
      padding: 2,
    }),
  ).toBe('calc(28.5714% + 28px)');
});

it('获取周状态的水平位置', () => {
  expect(
    getWeekStatusBarLeft([new Date(2020, 6, 8), new Date(2020, 7, 10)], {
      width: 32,
      height: 32,
      padding: 2,
    }),
  ).toBe('calc(28.5714% + 2px)');
});

it('获取周状态条的垂直位置', () => {
  expect(
    getWeekStatusBarTop(2, { width: 32, height: 32, padding: 2 }, true),
  ).toBe(66);
});

it('获取周状态条的边框半径', () => {
  expect(
    getWeekStatusBarBorderRadius({ width: 32, height: 32, padding: 2 }),
  ).toBe(14);
});

it('获取周状态条样式', () => {
  expect(
    getWeekStatusBarStyle(
      [new Date(2020, 6, 8), new Date(2020, 6, 10)],
      {
        width: 32,
        height: 32,
        padding: 2,
      },
      1,
      true,
    ),
  ).toEqual({
    width: 'calc(28.5714% + 28px)',
    height: 28,
    borderRadius: 14,
    left: 'calc(28.5714% + 2px)',
    top: 34,
  });
});
