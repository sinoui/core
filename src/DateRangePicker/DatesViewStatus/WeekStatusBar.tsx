import formatDate from '@sinoui/core/DatePicker/formatDate';
import bemClassNames from '@sinoui/core/utils/bemClassNames';
import { useMemo } from 'react';

import getDayOfWeek from '../helpers/getDayOfWeek';
import getMobileWeekStatusBarStyle from './getMobileWeekStatusBarStyle';
import getWeekStatusBarStyle from './getWeekStatusBarStyle';
import WeekStatusBarWrapper from './WeekStatusBarWrapper';

/**
 * 周状态条组件属性
 */
interface Props {
  /**
   * 设置为`true`，则表示空心。
   */
  outlined?: boolean;
  /**
   * 周在月份中的序号，从0开始。
   */
  weekNo: number;
  /**
   * 有效状态区间的开始日期
   */
  startDate: Date;
  /**
   * 有效状态区间的结束日期
   */
  endDate: Date;
  /**
   * 是否是pc设备，默认为true
   */
  isPc?: boolean;
  /**
   * 是否是开始时间
   */
  isStart?: boolean;
  /**
   * 是否是结束时间
   */
  isEnd?: boolean;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
}

/**
 * 周状态条
 *
 * @param props 组件属性
 * @param props.outlined 设置为`true`，则表示空心。
 * @param props.weekNo 周在月份中的序号，从0开始。
 * @param props.startDate 有效状态区间的开始日期
 * @param props.endDate 有效状态区间的结束日期
 * @param props.isPc 是否是pc设备，默认为true
 * @param props.isStart 是否是开始时间
 * @param props.isEnd 是否是结束时间
 * @param props.startOfWeek 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
 */
const WeekStatusBar: React.FC<Props> = ({
  outlined,
  weekNo,
  startDate,
  endDate,
  isPc = true,
  isStart = false,
  isEnd = false,
  startOfWeek = 1,
  ...rest
}) => {
  const startDay = getDayOfWeek(startDate, startOfWeek === 0);
  const endDay = getDayOfWeek(endDate, startOfWeek === 0);
  const weekBarStyle = useMemo(
    () =>
      isPc
        ? getWeekStatusBarStyle([startDay, endDay], weekNo)
        : getMobileWeekStatusBarStyle(
            [startDay, endDay],
            weekNo,
            isStart,
            isEnd,
          ),
    [endDay, isEnd, isPc, isStart, startDay, weekNo],
  );

  return (
    <WeekStatusBarWrapper
      outlined={outlined}
      className={bemClassNames('sinoui-date-range-picker__week-status-bar', {
        outlined,
        raised: !outlined,
      })}
      data-week-no={weekNo}
      data-start-date={formatDate(startDate)}
      data-end-date={formatDate(endDate)}
      style={weekBarStyle}
      {...rest}
    />
  );
};

export default WeekStatusBar;
