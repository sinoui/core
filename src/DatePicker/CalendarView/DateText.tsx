import type React from 'react';

import ViewModel from '../ViewModel';

/**
 * 日期文本组件的属性
 */
interface Props {
  /**
   * 日期。默认为当前日期。
   */
  date?: Date;
  /**
   * 日历开始的视图
   */
  startViewModel: ViewModel;
}

/**
 * 日期文本组件
 *
 * @param props 属性
 * @param props.date 日期
 * @param props.startViewModel 日历开始的视图
 */
const DateText: React.FC<Props> = ({ date = new Date(), startViewModel }) => (
  <>
    {date.getFullYear()}年{date.getMonth() + 1}月
    {startViewModel === ViewModel.dates ? <>{date.getDate()}日</> : null}
  </>
);

export default DateText;
