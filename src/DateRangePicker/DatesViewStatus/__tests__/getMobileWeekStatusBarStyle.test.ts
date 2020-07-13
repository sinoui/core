import getMobileWeekStatusBarStyle, {
  getWeekStatusBarHeight,
  getMobileWeekStatusBarWidth,
  getMobileWeekStatusBarLeft,
  getWeekStatusBarTop,
  getWeekStatusBarBorderRadius,
} from '../getMobileWeekStatusBarStyle';

it('获取周状态条高度', () => {
  expect(getWeekStatusBarHeight()).toBe(40);
});

it('获取周状态条的垂直位置', () => {
  expect(getWeekStatusBarTop(2)).toBe(148);
});

it('获取周状态条的边框半径', () => {
  expect(getWeekStatusBarBorderRadius()).toBe(20);
});

describe('获取周状态条的宽度', () => {
  it('开始时间和结束时间在同一周', () => {
    expect(
      getMobileWeekStatusBarWidth(
        [new Date(2020, 5, 2), new Date(2020, 5, 6)],
        true,
        true,
      ),
    ).toBe(
      'calc((100% - 24px) / 7 * 3 + (100% - 24px) / 7 / 2 + 20px + (100% - 24px) / 7 / 2 + 20px)',
    );
  });

  it('结束时间在第一周，且1号是周一', () => {
    expect(
      getMobileWeekStatusBarWidth(
        [new Date(2020, 5, 1), new Date(2020, 5, 6)],
        false,
        true,
      ),
    ).toBe(
      'calc((100% - 24px) / 7 * 4 + (100% - 24px) / 7 + (100% - 24px) / 7 / 2 + 20px + 12px)',
    );
  });

  it('结束时间在第一周，且1号不是周一', () => {
    expect(
      getMobileWeekStatusBarWidth(
        [new Date(2020, 6, 1), new Date(2020, 6, 3)],
        false,
        true,
      ),
    ).toBe(
      'calc((100% - 24px) / 7 * 1 + (100% - 24px) / 7 + (100% - 24px) / 7 / 2 + 20px)',
    );
  });

  it('开始时间在最后一周', () => {
    expect(
      getMobileWeekStatusBarWidth(
        [new Date(2020, 4, 29), new Date(2020, 4, 31)],
        true,
        false,
      ),
    ).toBe(
      'calc((100% - 24px) / 7 * 1 + (100% - 24px) / 7 / 2 + 20px + (100% - 24px) / 7 + 12px)',
    );

    expect(
      getMobileWeekStatusBarWidth(
        [new Date(2020, 5, 29), new Date(2020, 5, 30)],
        true,
        false,
      ),
    ).toBe(
      'calc((100% - 24px) / 7 * 0 + (100% - 24px) / 7 / 2 + 20px + (100% - 24px) / 7)',
    );
  });

  it('是开始日期或结束日期所在的周', () => {
    expect(
      getMobileWeekStatusBarWidth(
        [new Date(2020, 5, 3), new Date(2020, 5, 7)],
        true,
        false,
      ),
    ).toBe(
      'calc((100% - 24px) / 7 * 3 + (100% - 24px) / 7 / 2 + 20px + (100% - 24px) / 7 + 12px)',
    );
  });

  it('既不包含开始时间，又不包含结束时间的周', () => {
    expect(
      getMobileWeekStatusBarWidth(
        [new Date(2020, 5, 8), new Date(2020, 5, 14)],
        false,
        false,
      ),
    ).toBe(
      'calc((100% - 24px) / 7 * 5 + (100% - 24px) / 7 + (100% - 24px) / 7 + 12px + 12px)',
    );
  });
});

describe('获取周状态条的水平位置', () => {
  it('第一周且不包含开始时间', () => {
    expect(
      getMobileWeekStatusBarLeft(
        [new Date(2020, 6, 1), new Date(2020, 6, 5)],
        false,
      ),
    ).toBe('calc(12px + (100% - 24px) / 7 * 2)');
  });

  it('不是开始时间所在的周，且不是第一周', () => {
    expect(
      getMobileWeekStatusBarLeft(
        [new Date(2020, 6, 6), new Date(2020, 6, 8)],
        false,
      ),
    ).toBe('calc((100% - 24px) / 7 * 0)');
  });

  it('除上述情况外，获取水平位置', () => {
    expect(
      getMobileWeekStatusBarLeft(
        [new Date(2020, 6, 6), new Date(2020, 6, 10)],
        true,
      ),
    ).toBe('calc(12px + (100% - 24px) / 7 * 0 + (100% - 24px) / 7 / 2 - 20px)');
  });
});

it('获取周状态条的样式', () => {
  expect(
    getMobileWeekStatusBarStyle(
      [new Date(2020, 6, 6), new Date(2020, 6, 10)],
      1,
      true,
    ),
  ).toEqual({
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    height: 40,
    left: 'calc(12px + (100% - 24px) / 7 * 0 + (100% - 24px) / 7 / 2 - 20px)',
    top: 100,
    width:
      'calc((100% - 24px) / 7 * 3 + (100% - 24px) / 7 / 2 + 20px + (100% - 24px) / 7)',
  });
});
