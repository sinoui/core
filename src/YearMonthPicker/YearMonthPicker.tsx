import type { BaseDatePickerProps } from '@sinoui/core/DatePicker/BaseDatePicker';
import BaseDatePicker from '@sinoui/core/DatePicker/BaseDatePicker';
import ViewModel from '@sinoui/core/DatePicker/ViewModel';

import mem from '../utils/mem';

/**
 * 年月选择组件的属性
 */
export interface YearMonthPickerProps
  extends Omit<
    BaseDatePickerProps,
    'value' | 'onChange' | 'startViewModel' | 'min' | 'max' | 'renderValue'
  > {
  /**
   * 值。格式为 ·YYYY-MM`。示例：`2022-03`。
   */
  value?: string;
  /**
   * 值变化时的回调函数
   */
  onChange?: (date?: string) => void;
  /**
   * 最小值
   */
  min?: string;
  /**
   * 最大值
   */
  max?: string;

  /**
   * 指定自定义的值渲染函数。默认情况下，直接显示`value`属性值。
   */
  renderValue?: (value?: Date) => React.ReactNode;
}

const leadingZero = (num: number) => (num < 10 ? `0${num}` : num);
/**
 * 将日期格式化为年月
 *
 * @param date 日期
 * @returns 返回格式化的年月
 */
const formatYearMonth = (date?: Date) =>
  date ? `${date.getFullYear()}-${leadingZero(date.getMonth() + 1)}` : '';

const YEAR_MONTH_REGEXP = /(\d{4})-0?(\d{1,2})/;
/**
 * 解析年月（2022-01）
 */
const parseYearMonth = mem((date?: string) => {
  if (!date) {
    return undefined;
  }
  const matches = date.match(YEAR_MONTH_REGEXP);

  if (matches) {
    return new Date(parseInt(matches[1], 10), parseInt(matches[2], 10) - 1);
  }

  return undefined;
});

/**
 * 日期选择组件
 *
 * @param props 组件属性
 */
export default function DatePicker(props: YearMonthPickerProps) {
  const { value, min, max, onChange, renderValue, ...rest } = props;
  const handleChange = onChange
    ? (date?: Date) => onChange(formatYearMonth(date))
    : undefined;

  return (
    <BaseDatePicker
      {...rest}
      value={parseYearMonth(value)}
      min={parseYearMonth(min)}
      max={parseYearMonth(max)}
      onChange={handleChange}
      startViewModel={ViewModel.months}
      renderValue={renderValue ?? formatYearMonth}
    />
  );
}
