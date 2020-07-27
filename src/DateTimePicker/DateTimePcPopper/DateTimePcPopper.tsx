import React from 'react';
import type { PopperProps } from '@sinoui/core/Popper';
import Popper from '@sinoui/core/Popper';
import Fade from '@sinoui/core/Fade';
import DateTimeView from './DateTimeView';

interface Props extends Omit<PopperProps, 'onChange' | 'children'> {
  /**
   * 日期
   */
  date?: Date;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * 默认年份
   */
  defaultYear?: number;
  /**
   * 默认月份
   */
  defaultMonth?: number;
  /*
   * 设置为`true`，则跳过月份选择。默认情况下，在桌面端不跳过，在移动端跳过。
   */
  skipMonthsView?: boolean;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
  /**
   * 最小日期
   */
  minDate?: Date;
  /**
   * 最大日期
   */
  maxDate?: Date;
  /**
   * 设置为`true`，则显示今日状态。默认为`true`。
   */
  showToday?: boolean;
  /**
   * 最小小时数。默认为`0`。
   */
  minHour?: number;
  /**
   * 最大小时数。默认为`23`。
   */
  maxHour?: number;
  /**
   * 最小分钟数。默认为`0`。
   */
  minMinute?: number;
  /**
   * 最大分钟数。默认为`59`。
   */
  maxMinute?: number;
  /**
   * 小时间隔
   */
  hourStep?: number;
  /**
   * 分钟间隔
   */
  minuteStep?: number;
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose?: () => void;
  /**
   * 是否展示下月日期
   */
  showNextMonthDates?: boolean;
}

export default function DateTimePcPopper(props: Props) {
  const {
    date,
    hourStep = 1,
    minuteStep = 1,
    onChange,
    onRequestClose,
    minDate,
    maxDate,
    minHour,
    minMinute,
    maxHour,
    maxMinute,
    startOfWeek,
    skipMonthsView,
    defaultYear,
    defaultMonth,
    showToday,
    open,
    showNextMonthDates,
    ...rest
  } = props;
  return (
    <Popper placement="bottom-start" {...rest} open={open}>
      <Fade in={open}>
        <DateTimeView
          date={date}
          hourStep={hourStep}
          minuteStep={minuteStep}
          minute={
            date
              ? date.getMinutes() - (date.getMinutes() % minuteStep)
              : undefined
          }
          hour={
            date ? date.getHours() - (date.getHours() % hourStep) : undefined
          }
          onChange={onChange}
          onBlur={onRequestClose}
          minDate={minDate}
          maxDate={maxDate}
          minHour={minHour}
          minMinute={minMinute}
          maxHour={maxHour}
          maxMinute={maxMinute}
          startOfWeek={startOfWeek}
          skipMonthsView={skipMonthsView}
          defaultYear={defaultYear}
          defaultMonth={defaultMonth}
          showToday={showToday}
          showNextMonthDates={showNextMonthDates}
        />
      </Fade>
    </Popper>
  );
}
