import React from 'react';
import useSelect from '@sinoui/core/useSelect';
import InputAdornment from '@sinoui/core/InputAdornment';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import type { PopperProps } from '../Popper';
import useIsPc from '../DatePicker/useIsPc';
import mem from '../utils/mem';
import isNaN from '../utils/isNaN';
import DateTimePcPopper from './DateTimePcPopper/DateTimePcPopper';
import DateTimeMobileModal from './DateTimeMobileModal/DateTimeMobileModal';

export interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange' | 'multiple'
  > {
  /**
   * 值
   */
  value?: string;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * 最小值
   */
  min?: string;
  /**
   * 最大值
   */
  max?: string;
  /**
   * 默认年份
   */
  defaultYear?: number;
  /**
   * 默认月份
   */
  defaultMonth?: number;
  /**
   * 是否采用portal形式
   */
  portal?: boolean;
  /**
   * 指定弹窗属性
   */
  popperProps?: PopperProps;
  /**
   * 是否是pc设备
   */
  isPc?: boolean;
  /**
   * 指定自定义的值渲染函数。默认情况下，直接显示`value`属性值。
   */
  renderValue?: (value?: Date) => React.ReactNode;
  /**
   * 小时间隔
   */
  hourStep?: number;
  /**
   * 分钟间隔
   */
  minuteStep?: number;
  /*
   * 设置为`true`，则跳过月份选择。默认情况下，在桌面端不跳过，在移动端跳过。
   */
  skipMonthsView?: boolean;
  /**
   * 是否展示今天
   */
  showToday?: boolean;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
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
}

const parseDate = mem((dateStr?: string) => {
  const availableDateStr = dateStr ? dateStr.replace(/-/g, '/') : undefined;
  return availableDateStr && !isNaN(Date.parse(availableDateStr))
    ? new Date(Date.parse(`${availableDateStr}:00`))
    : undefined;
});

const isValidateDate = (value?: string) =>
  value && !isNaN(Date.parse(value.replace(/-/g, '/')));

/**
 * 日期时间选择组件
 * @param props
 */
export default function DateTimePicker(props: Props) {
  const {
    isPc: isPcProp,
    portal,
    value,
    renderValue,
    onChange,
    hourStep,
    minuteStep,
    popperProps,
    min,
    max,
    skipMonthsView,
    startOfWeek,
    minHour,
    minMinute,
    maxHour,
    maxMinute,
    defaultYear,
    defaultMonth,
    showToday,
  } = props;

  const isNativePc = useIsPc();
  const isPc = isPcProp ?? isNativePc;
  const date = parseDate(value);
  const inputValue = isValidateDate(value) ? value : '';
  const inputRenderValue = renderValue ? renderValue(date) : inputValue;

  const {
    getPopperProps,
    getTextInputProps,
    onRequestClose,
    getModalProps,
  } = useSelect({
    ...props,
    isRenderWithPopper: isPc,
    renderValue: inputRenderValue,
  });

  const handleClear = () => {
    if (onChange) {
      onChange('');
    }
  };

  return (
    <>
      <TextInput
        {...getTextInputProps()}
        baseClassName="sinoui-date-time-picker"
        value={inputValue}
        onClear={handleClear}
        endAdornment={
          <InputAdornment position="end">
            <DatePickerIcon />
          </InputAdornment>
        }
        inputProps={{
          ...getTextInputProps().inputProps,
        }}
      />
      {isPc ? (
        <DateTimePcPopper
          {...getPopperProps()}
          portal={portal}
          {...popperProps}
          isPc={isPc}
          date={date}
          hourStep={hourStep}
          minuteStep={minuteStep}
          onChange={onChange}
          onRequestClose={onRequestClose}
          minDate={parseDate(min)}
          maxDate={parseDate(max)}
          minHour={minHour}
          minMinute={minMinute}
          maxHour={maxHour}
          maxMinute={maxMinute}
          startOfWeek={startOfWeek}
          skipMonthsView={skipMonthsView}
          defaultYear={defaultYear}
          defaultMonth={defaultMonth}
          showToday={showToday}
        />
      ) : (
        <DateTimeMobileModal
          {...getModalProps()}
          onRequestClose={onRequestClose}
          date={date}
          onChange={onChange}
          defaultYear={defaultYear}
          defaultMonth={defaultMonth}
          startOfWeek={startOfWeek}
          minHour={minHour}
          maxHour={maxHour}
          minMinute={minMinute}
          maxMinute={maxMinute}
          skipMonthsView={skipMonthsView}
          showToday={showToday}
          minDate={parseDate(min)}
          maxDate={parseDate(max)}
        />
      )}
    </>
  );
}
