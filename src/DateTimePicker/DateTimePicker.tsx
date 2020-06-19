import React from 'react';
import useSelect from '@sinoui/core/useSelect';
import styled from 'styled-components';
import Popper from '@sinoui/core/Popper';
import InputAdornment from '@sinoui/core/InputAdornment';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import type { PopperProps } from '../Popper';
import useIsPc from '../DatePicker/useIsPc';
import DateTimeView from './DateTimeView/DateTimeView';
import mem from '../utils/mem';
import isNaN from '../utils/isNaN';

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

const StyledPopper = styled(Popper)`
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

const parseDate = mem((dateStr?: string) =>
  dateStr && !isNaN(Date.parse(dateStr))
    ? new Date(Date.parse(dateStr))
    : undefined,
);

const isValidateDate = (value?: string) => value && !isNaN(Date.parse(value));

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
    hourStep = 1,
    minuteStep = 1,
    popperProps,
    min,
    max,
    skipMonthsView,
    startOfWeek,
    minHour,
    minMinute,
    maxHour,
    maxMinute,
  } = props;

  const isNativePc = useIsPc();
  const isPc = isPcProp ?? isNativePc;
  const date = parseDate(value);
  const inputValue = isValidateDate(value) ? value : '';
  const inputRenderValue = renderValue ? renderValue(date) : inputValue;

  const { getPopperProps, getTextInputProps, onRequestClose } = useSelect({
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
          <InputAdornment position="end" disablePointerEvents>
            <DatePickerIcon />
          </InputAdornment>
        }
        inputProps={{
          ...getTextInputProps().inputProps,
        }}
      />
      <StyledPopper {...getPopperProps()} portal={portal} {...popperProps}>
        <DateTimeView
          isPc={isPc}
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
          minDate={parseDate(min)}
          maxDate={parseDate(max)}
          minHour={minHour}
          minMinute={minMinute}
          maxHour={maxHour}
          maxMinute={maxMinute}
          startOfWeek={startOfWeek}
          skipMonthsView={skipMonthsView}
        />
      </StyledPopper>
    </>
  );
}
