import getOutlinedDateRange from '../getOutlinedDateRange';

// 测试场景来自：https://github.com/sinoui/core/pull/84#issuecomment-654582373

describe('焦点在开始日期输入框上', () => {
  it('情况1：如果有endDate，但是没有startDate，而currentDate < endDate，则有[currentDate, endDate]的空心圈', () => {
    const endDate = new Date(2020, 8, 1);
    const currentDate = new Date(2020, 7, 20);
    expect(
      getOutlinedDateRange('start', undefined, endDate, currentDate),
    ).toEqual([currentDate, endDate]);
  });

  it('情况2：如果有endDate，但是没有startDate，而currentDate >= endDate，则没有空心圈', () => {
    const endDate = new Date(2020, 8, 1);
    const currentDate = new Date(2020, 8, 1);

    expect(getOutlinedDateRange('start', undefined, endDate, currentDate)).toBe(
      undefined,
    );

    expect(
      getOutlinedDateRange('start', undefined, endDate, new Date(2020, 8, 2)),
    ).toBe(undefined);
  });

  it('情况3：如果有startDate，但是没有endDate，这时不管currentDate在什么位置，都没有空心圈', () => {
    const startDate = new Date(2020, 8, 1);

    expect(
      getOutlinedDateRange('start', startDate, undefined, new Date(2020, 7, 1)),
    ).toBe(undefined);

    expect(
      getOutlinedDateRange('start', startDate, undefined, new Date(2020, 8, 1)),
    ).toBe(undefined);

    expect(
      getOutlinedDateRange('start', startDate, undefined, new Date(2020, 8, 2)),
    ).toBe(undefined);
  });

  it('情况4：如果有startDate和endDate，且currentDate < startDate，则有[currentDate, startDate]空心圈', () => {
    const startDate = new Date(2020, 8, 1);
    const endDate = new Date(2020, 8, 30);
    const currentDate = new Date(2020, 7, 20);
    expect(
      getOutlinedDateRange('start', startDate, endDate, currentDate),
    ).toEqual([currentDate, startDate]);
  });

  it('情况5：如果有startDate和endDate，且currentDate > = startDate，则没有空心圈', () => {
    const startDate = new Date(2020, 8, 1);
    const endDate = new Date(2020, 8, 30);
    const currentDate1 = startDate;
    const currentDate2 = new Date(2020, 8, 15);
    const currentDate3 = new Date(2020, 8, 30);
    const currentDate4 = new Date(2020, 9, 1);

    expect(
      getOutlinedDateRange('start', startDate, endDate, currentDate1),
    ).toBeUndefined();
    expect(
      getOutlinedDateRange('start', startDate, endDate, currentDate2),
    ).toBeUndefined();
    expect(
      getOutlinedDateRange('start', startDate, endDate, currentDate3),
    ).toBeUndefined();
    expect(
      getOutlinedDateRange('start', startDate, endDate, currentDate4),
    ).toBeUndefined();
  });

  it('情况6：如果startDate和endDate都没有，则currentDate不管在什么位置，都没有空心圈', () => {
    expect(
      getOutlinedDateRange(
        'start',
        undefined,
        undefined,
        new Date(2020, 8, 10),
      ),
    ).toBeUndefined();
  });
});

describe('焦点在结束日期输入框上', () => {
  it('情况7：如果startDate和endDate都没有，则currentDate不管在什么位置，都没有空心圈', () => {
    expect(
      getOutlinedDateRange('end', undefined, undefined, new Date(2020, 8, 10)),
    ).toBeUndefined();
  });

  it('情况8：如果endDate有值，startDate无值，则currentDate不管在什么位置，都没有空心圈', () => {
    const endDate = new Date(2020, 8, 1);
    const currentDate1 = new Date(2020, 7, 1);
    const currentDate2 = new Date(2020, 8, 1);
    const currentDate3 = new Date(2020, 8, 30);

    expect(
      getOutlinedDateRange('end', undefined, endDate, currentDate1),
    ).toBeUndefined();
    expect(
      getOutlinedDateRange('end', undefined, endDate, currentDate2),
    ).toBeUndefined();
    expect(
      getOutlinedDateRange('end', undefined, endDate, currentDate3),
    ).toBeUndefined();
  });

  it('情况9：如果startDate和endDate都有值，而currentDate > endDate，则有[endDate, currentDate]空心圈', () => {
    const startDate = new Date(2020, 8, 1);
    const endDate = new Date(2020, 8, 18);
    const currentDate = new Date(2020, 8, 19);

    expect(
      getOutlinedDateRange('end', startDate, endDate, currentDate),
    ).toEqual([endDate, currentDate]);
  });

  it('情况10：如果startDate有值，而endDate没有值，currentDate > startDate，则有[startDate, currentDate]空心圈', () => {
    const startDate = new Date(2020, 8, 1);
    const currentDate = new Date(2020, 8, 19);

    expect(
      getOutlinedDateRange('end', startDate, undefined, currentDate),
    ).toEqual([startDate, currentDate]);
  });
});
