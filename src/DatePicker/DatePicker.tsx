import isNaN from '../utils/isNaN';
import mem from '../utils/mem';
import type { BaseDatePickerProps } from './BaseDatePicker';
import BaseDatePicker from './BaseDatePicker';
import formatDate from './formatDate';
import ViewModel from './ViewModel';

/**
 * 日期选择组件的属性
 */
export interface DatePickerProps
  extends Omit<
    BaseDatePickerProps,
    'value' | 'onChange' | 'startViewModel' | 'min' | 'max' | 'renderValue'
  > {
  /**
   * 值
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

const parseDate = mem((dateStr?: string) =>
  dateStr && !isNaN(Date.parse(dateStr))
    ? new Date(Date.parse(dateStr))
    : undefined,
);

/**
 * 日期选择组件
 *
 * @param props 组件属性
 */
export default function DatePicker(props: DatePickerProps) {
  const { value, min, max, onChange, renderValue, ...rest } = props;
  const handleChange = onChange
    ? (date?: Date) => {
        if (date) {
          return onChange(formatDate(date));
        }
        return onChange('');
      }
    : undefined;

  return (
    <BaseDatePicker
      {...rest}
      value={parseDate(value)}
      min={parseDate(min)}
      max={parseDate(max)}
      onChange={handleChange}
      startViewModel={ViewModel.dates}
      renderValue={renderValue ?? formatDate}
    />
  );
}
