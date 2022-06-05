import type { PopperProps } from '@sinoui/core/Popper';
import Popper from '@sinoui/core/Popper';

import type { Props as DateRangeViewProps } from './DateRangeView';
import DateRangeView from './DateRangeView';

/**
 * 组件属性
 */
interface Props extends Omit<PopperProps, 'children'>, DateRangeViewProps {}

/**
 * 日期区间选择组件pc端弹窗
 *
 * @param props 组件属性
 */
const DateRangePcPopper: React.FC<Props> = (props) => {
  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    onDateClick,
    defaultYear,
    defaultMonth,
    focusedInput,
    startOfWeek,
    ...rest
  } = props;
  return (
    <Popper
      {...rest}
      placement="bottom-start"
      className="sinoui-date-range-picker__popper"
    >
      <DateRangeView
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        onDateClick={onDateClick}
        defaultYear={defaultYear}
        defaultMonth={defaultMonth}
        focusedInput={focusedInput}
        startOfWeek={startOfWeek}
      />
    </Popper>
  );
};

export default DateRangePcPopper;
