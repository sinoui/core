import React from 'react';
import Modal from '@sinoui/core/Modal';
import type { ModalProps } from '@sinoui/core/Modal';
import Fade from '@sinoui/core/Fade';
import DateTimeMobileView from './DateTimeMobileView';

interface Props extends Omit<ModalProps, 'children'> {
  /**
   * 选中的日期
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
  /**
   * 是否展示今天
   */
  showToday?: boolean;
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
  /*
   * 设置为`true`，则跳过月份选择。默认情况下，在桌面端不跳过，在移动端跳过。
   */
  skipMonthsView?: boolean;
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose?: () => void;
}

export default function DateTimeMobileModal(props: Props) {
  const {
    open,
    onRequestClose,
    date,
    onChange,
    defaultMonth,
    defaultYear,
    startOfWeek,
    minHour,
    minMinute,
    maxHour,
    maxMinute,
    minDate,
    maxDate,
    skipMonthsView,
    showToday,
    ...other
  } = props;
  return (
    <Modal open={open} onRequestClose={onRequestClose} {...other}>
      <Fade in={open}>
        <DateTimeMobileView
          {...other}
          onClose={onRequestClose}
          date={date}
          showToday={showToday}
          onChange={onChange}
          defaultMonth={defaultMonth}
          defaultYear={defaultYear}
          startOfWeek={startOfWeek}
          minHour={minHour}
          maxHour={maxHour}
          minMinute={minMinute}
          maxMinute={maxMinute}
          minDate={minDate}
          maxDate={maxDate}
          skipMonthsView={skipMonthsView}
        />
      </Fade>
    </Modal>
  );
}
