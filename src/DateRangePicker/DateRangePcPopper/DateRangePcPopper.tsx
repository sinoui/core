import React from 'react';
import Popper from '@sinoui/core/Popper';
import type { PopperProps } from '@sinoui/core/Popper';
import DateRangeView from './DateRangeView';
import type { Props as DateRangeViewProps } from './DateRangeView';

interface Props extends Omit<PopperProps, 'children'>, DateRangeViewProps {}

/**
 * 日期区间选择组件pc端弹窗
 * @param props
 */
export default function DateRangePcPopper(props: Props) {
  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    onDateClick,
    defaultYear,
    defaultMonth,
    focusedInput,
    ...rest
  } = props;
  return (
    <Popper {...rest} placement="bottom-start">
      <DateRangeView
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        onDateClick={onDateClick}
        defaultYear={defaultYear}
        defaultMonth={defaultMonth}
        focusedInput={focusedInput}
      />
    </Popper>
  );
}
