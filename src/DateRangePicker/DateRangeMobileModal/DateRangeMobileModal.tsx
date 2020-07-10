import React from 'react';
import Modal from '@sinoui/core/Modal';
import type { ModalProps } from '@sinoui/core/Modal';
import MobileDateRangeView from './MobileDateRangeView';

interface Props extends Omit<ModalProps, 'children'> {
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 开始时间
   */
  startDate?: Date;
  /**
   * 结束时间
   */
  endDate?: Date;
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
   * 指定最小日期。
   */
  minDate?: Date;
  /**
   * 指定最大日期。
   */
  maxDate?: Date;
  /**
   * 聚焦的输入框
   */
  focusedInput?: 'start' | 'end';
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string[]) => void;
}

/**
 * 移动端日期区间选择弹窗
 * @param props
 */
export default function DateRangeMobileModal(props: Props) {
  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    defaultMonth,
    defaultYear,
    focusedInput,
    onRequestClose,
    onChange,
    title,
    ...rest
  } = props;
  return (
    <Modal {...rest} backdrop={false} autoFocus={false} enforceFocus={false}>
      <MobileDateRangeView
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        defaultYear={defaultYear}
        defaultMonth={defaultMonth}
        focusedInput={focusedInput}
        onRequestClose={onRequestClose}
        onChange={onChange}
        title={title}
      />
    </Modal>
  );
}