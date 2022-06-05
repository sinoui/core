import type React from 'react';

/**
 * 日期文本组件的属性
 */
interface Props {
  /**
   * 日期。默认为当前日期。
   */
  date?: Date;
}

/**
 * 日期文本组件
 *
 * @param props 属性
 * @param props.date 日期
 */
const DateText: React.FC<Props> = ({ date = new Date() }) => (
    <>
      {date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日
    </>
  );

export default DateText;
