import React, { useMemo } from 'react';
import getMonthWeeks from '../helpers/getMonthWeeks';
import getCrossDateRange from '../helpers/getCrossDateRange';
import WeekStatusBar from './WeekStatusBar';

interface Props {
  /**
   * 开始时间
   */
  startDate: Date;
  /**
   * 结束时间
   */
  endDate: Date;
  /**
   * 月视图所在年份
   */
  year: number;
  /**
   * 月视图所在的月份
   */
  month: number;
  /**
   * 设置为`true`，则表示空心。
   */
  outlined?: boolean;
}

const MemoWeekStatusBar = React.memo(WeekStatusBar);

/**
 * 日期视图状态
 * 
 * 注意，在使用`DatesViewStatus`组件时，需要确保包裹元素上有`position: relative`，例如：
 * 
 * ```ts
   <div style={{ position: 'relative' }}>
     <DatesViewStatus year={2020} month={5} />
   </div>
   ```
 */
export default function DatesViewStatus({
  startDate,
  endDate,
  year,
  month,
  ...rest
}: Props) {
  const weekBars = useMemo(
    () =>
      getMonthWeeks(year, month).map((range) =>
        getCrossDateRange([startDate, endDate], range),
      ),
    [year, month, startDate, endDate],
  );

  return (
    <>
      {weekBars.map((weekbar, index) =>
        weekbar ? (
          <MemoWeekStatusBar
            key={`${weekbar[0]}-${weekbar[1]}`}
            weekNo={index}
            startDate={weekbar[0]}
            endDate={weekbar[1]}
            {...rest}
          />
        ) : null,
      )}
    </>
  );
}
